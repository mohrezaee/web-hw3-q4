package utils

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

type User_account struct {
	User_id       uint   `gorm:"primary_key"`
	Email         string `gorm:"unique;not null;type:varchar"`
	Phone_number  string `gorm:"unique;not null;type:varchar"`
	Gender        string `gorm:"type:varchar(1)"`
	First_name    string `gorm:"type:varchar"`
	Last_name     string `gorm:"type:varchar"`
	Password_hash string `gorm:"type:varchar"`
}

type Unauthorized_token struct {
	User_id    uint      `gorm:"references:User_account.User_id;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Token      string    `gorm:"type:varchar"`
	Expiration time.Time `gorm:"type:timestamp"`
}

type ErrResponse struct {
	Message string
}

type User_info struct {
	User_id      uint
	Email        string
	Phone_number string
	Gender       string
	First_name   string
	Last_name    string
}

func HandleErr(err error) {
	if err != nil {
		panic(err.Error())
	}
}

func PassMap(pass []byte) string {
	hashed, err := bcrypt.GenerateFromPassword(pass, bcrypt.MinCost)
	HandleErr(err)

	return string(hashed)
}

func ConnectDB() *gorm.DB {
	db, err := gorm.Open("postgres",
		fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=disable",
			os.Getenv("DB_HOST"),
			os.Getenv("DB_PORT"),
			os.Getenv("DB_USER"),
			os.Getenv("DB_DATABASE"),
			os.Getenv("DB_PASSWORD"),
		))
	HandleErr(err)
	return db
}

func PanicHandler(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			error := recover()
			if error != nil {
				log.Println(error)

				resp := ErrResponse{Message: "Internal server error"}
				json.NewEncoder(w).Encode(resp)
			}
		}()
		next.ServeHTTP(w, r)
	})
}

func IsEmailValid(email string) bool {
	emailPattern := regexp.MustCompile(`^[A-Za-z0-9]+[@]+[A-Za-z0-9]+[.]+[A-Za-z]+$`)
	if !emailPattern.MatchString(email) || len(email) > 50 {
		return false
	}
	return true
}

func IsPhoneValid(phone_number string) bool {
	phonePattern := regexp.MustCompile(`^[0-9]{11}$`)
	if !phonePattern.MatchString(phone_number) {
		return false
	}
	return true
}

func IsGenderValid(gender string) bool {
	if !(gender == "F" || gender == "M") {
		return false
	}
	return true
}

func IsNamesValid(f_name string, l_name string) bool {
	namePattern := regexp.MustCompile(`^[A-Za-z]+$`)
	if !namePattern.MatchString(f_name) || !namePattern.MatchString(l_name) {
		return false
	}
	return true
}

func IsPassvalid(pass string) bool {
	passPattern := regexp.MustCompile(`^\S{8,}$`)
	if !passPattern.MatchString(pass) {
		return false
	}
	return true
}

func IsEmail(emailOrPhone string) bool {
	emailPattern := regexp.MustCompile(`^[A-Za-z0-9]+[@]+[A-Za-z0-9]+[.]+[A-Za-z]+$`)
	if emailPattern.MatchString(emailOrPhone) {
		return true
	} else {
		return false
	}
}

type MyCustomClaims struct {
	User_id    int     `json:"user_id"`
	Expiration float64 `json:"exp"`
	jwt.StandardClaims
}

func IsTokenValid(jwtToken string) (string, time.Time) {

	if jwtToken == "" {
		return "", time.Now()
	}
	splitToken := strings.Split(jwtToken, "Bearer ")
	jwtToken = splitToken[1]

	token, err := jwt.ParseWithClaims(jwtToken, &MyCustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte("AccessToken"), nil
	})

	if err != nil {
		HandleErr(err)
		return "", time.Now()
	}
	if claims, ok := token.Claims.(*MyCustomClaims); ok && token.Valid {
		var tm = time.Unix(int64(claims.Expiration), 0)
		if tm.Before(time.Now()) {
			fmt.Println("expired token")
			return "", time.Now()
		}
		return strconv.Itoa(claims.User_id), tm
	}
	return "", time.Now()
}
