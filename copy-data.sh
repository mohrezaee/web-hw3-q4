# copy ticket.sql to ticket db
docker cp ./ticket.sql postgres:/var/lib/postgresql/ticket.sql
# create tables in ticket db
docker exec postgres psql -U test postgres -f /var/lib/postgresql/ticket.sql

# copy ticket.sql to auth db
docker cp ./auth.sql postgres-auth:/var/lib/postgresql/ticket.sql
# create tables in auth db
docker exec postgres-auth psql -U test postgres -f /var/lib/postgresql/auth.sql

# copy copy-csv.sql to ticket db
docker cp ./copy-csv.sql postgres:/var/lib/postgresql/copy-csv.sql
# import csv to ticket db
docker exec postgres psql -U test postgres -f /var/lib/postgresql/copy-csv.sql

