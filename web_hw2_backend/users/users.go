package users

import (
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/go-redis/redis"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
	"mahsa_airline.com/go-auth-backend/utils"
)

var exptime = 300
var client *redis.Client = redis.NewClient(&redis.Options{
	Addr:     os.Getenv("REDIS_HOST"),
	Password: "",
	DB:       0,
})

func generateToken(user *utils.User_account) string {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["user_id"] = user.User_id
	claims["exp"] = time.Now().Add(time.Second * time.Duration(exptime)).Unix()

	t, err := token.SignedString([]byte("AccessToken"))
	utils.HandleErr(err)
	return t
}

func Signup(email string, phone_number string, gender string,
	f_name string, l_name string, pass string) map[string]interface{} {
	db := utils.ConnectDB()
	user := &utils.User_account{}
	if db.Where("email = ? ", email).First(&user).RecordNotFound() && db.Where("phone_number = ? ", phone_number).First(&user).RecordNotFound() {
		if !utils.IsEmailValid(email) {
			return handleSignup(db, "Invalid email.")
		} else if !utils.IsPhoneValid(phone_number) {
			return handleSignup(db, "Phone numbers are 11 digits(09121234567).")
		} else if !utils.IsGenderValid(gender) {
			return handleSignup(db, "Gender must be F or M.")
		} else if !utils.IsNamesValid(f_name, l_name) {
			return handleSignup(db, "Names contain only english letters.")
		} else if !utils.IsPassvalid(pass) {
			return handleSignup(db, "Password are atleast 8 characters.")
		} else {
			generatedPassword := utils.PassMap([]byte(pass))
			user := &utils.User_account{Email: email, Phone_number: phone_number, Gender: gender,
				First_name: f_name, Last_name: l_name, Password_hash: generatedPassword}
			db.Create(&user)
			return handleSignup(db, "you are signed up.")
		}
	} else {
		defer db.Close()
		return map[string]interface{}{"message": "user already exists."}
	}

}

func handleSignup(db *gorm.DB, message string) map[string]interface{} {
	defer db.Close()
	return map[string]interface{}{"message": message}
}

func Signin(emailOrPhone string, pass string) map[string]interface{} {
	db := utils.ConnectDB()
	user := &utils.User_account{}

	if utils.IsEmail(emailOrPhone) {
		return handleSignin(db, emailOrPhone, user, pass, true)
	} else if utils.IsPhoneValid(emailOrPhone) {
		return handleSignin(db, emailOrPhone, user, pass, false)
	} else {
		defer db.Close()
		return map[string]interface{}{"message": "invalid inputs"}
	}

}

func handleSignin(db *gorm.DB, emailOrPhone string, user *utils.User_account, pass string, isEmail bool) map[string]interface{} {
	var reqString = ""
	if isEmail {
		reqString = "email = ? "
	} else {
		reqString = "phone_number = ? "
	}
	if db.Where(reqString, emailOrPhone).First(&user).RecordNotFound() {
		if isEmail {
			return map[string]interface{}{"message": "Wrong email"}
		} else {
			return map[string]interface{}{"message": "Wrong phone number"}
		}
	}
	passErr := bcrypt.CompareHashAndPassword([]byte(user.Password_hash), []byte(pass))
	if passErr == bcrypt.ErrMismatchedHashAndPassword && passErr != nil {
		return map[string]interface{}{"message": "Wrong pass"}
	}
	defer db.Close()

	var response = map[string]interface{}{"message": "you are logged in."}
	var token = generateToken(user)
	response["jwt"] = token
	response["email"] = user.Email
	return response
}

func GetUserInfo(jwt string) map[string]interface{} {

	isValid, _ := utils.IsTokenValid(jwt)
	if isValid != "" {
		splitToken := strings.Split(jwt, "Bearer ")
		jwtToken := splitToken[1]
		id := isValid
		db := utils.ConnectDB()
		user := &utils.User_account{}
		u_token := &utils.Unauthorized_token{}

		// can it happen?!
		if db.Where("user_id = ? ", id).First(&user).RecordNotFound() {
			defer db.Close()
			return map[string]interface{}{"message": "User not found"}
		}

		_, isExpired := checkCache(id, jwtToken)
		if isExpired {
			defer db.Close()
			return map[string]interface{}{"message": "token is expired."}
		}

		if !db.Where("token = ? ", jwtToken).First(&u_token).RecordNotFound() {
			return map[string]interface{}{"message": "token is expired!"}
		}

		responseUser := &utils.User_info{
			User_id:      user.User_id,
			Email:        user.Email,
			Phone_number: user.Phone_number,
			Gender:       user.Gender,
			First_name:   user.First_name,
			Last_name:    user.Last_name,
		}
		var response = map[string]interface{}{"message": "all user data retrieved successfully."}
		response["data"] = responseUser
		defer db.Close()
		return response
	} else {
		return map[string]interface{}{"message": "Not valid token"}
	}
}

func Signout(jwt string) map[string]interface{} {

	isValid, exp_time := utils.IsTokenValid(jwt)
	if isValid != "" {
		splitToken := strings.Split(jwt, "Bearer ")
		jwtToken := splitToken[1]
		id := isValid
		db := utils.ConnectDB()
		u_token := &utils.Unauthorized_token{}

		uid, err := strconv.ParseUint(id, 10, 64)
		utils.HandleErr(err)

		c, isExpired := checkCache(id, jwtToken)
		if isExpired {
			return map[string]interface{}{"message": "token is expired."}
		} else {
			client.Set(c+"-"+id, jwtToken, time.Second*time.Duration(exptime)).Err()
			if err != nil {
				utils.HandleErr(err)
			}
		}

		if !db.Where("token = ? ", jwtToken).First(&u_token).RecordNotFound() {
			return map[string]interface{}{"message": "token is expired!"}
		}

		u_token = &utils.Unauthorized_token{User_id: uint(uid), Token: jwtToken, Expiration: exp_time}
		db.Create(&u_token)
		defer db.Close()

		return map[string]interface{}{"message": "signed out successfully."}
	} else {
		return map[string]interface{}{"message": "Not valid token"}
	}

}

func checkCache(id string, jwtToken string) (string, bool) {
	var count int = 0
	var c string
	var isExpired bool = false
	for true {
		count += 1
		c = strconv.FormatInt(int64(count), 10)
		r, _ := client.Get(c + "-" + id).Result()
		if r == jwtToken {
			isExpired = true
			break
		}
		if r == "" {
			break
		}
	}
	return c, isExpired
}
