docker run -d \
  --name postgres-market \
  -e POSTGRES_DB=market \
  -e POSTGRES_USER=market_user \
  -e POSTGRES_PASSWORD=market_pass \
  -p 5432:5432 \
  postgres:15