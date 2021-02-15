Домашня робота 1
1. Запускаємо `docker exec -it dd_homework_1 psql -U postgres -d homework_1 -f /sql/transaction.sql`
2. Бачимо такий вивід:
    ```sql
    BEGIN
    INSERT 0 1
    UPDATE 1
    INSERT 0 1
    UPDATE 1
    INSERT 0 1
    UPDATE 1
    PREPARE TRANSACTION
    ```
3. Запускаємо вдруге `docker exec -it dd_homework_1 psql -U postgres -d homework_1 -f /sql/transaction.sql`
4. Вивід зависає:
    ```sql
    BEGIN
    INSERT 0 1
    ```
5. Запускаємо `docker exec -it dd_homework_1 psql -U postgres -d homework_1 -c "select * from pg_prepared_xacts;"`
    ```bash
    transaction |       gid        |           prepared            |  owner   |  database
    -------------+------------------+-------------------------------+----------+------------
            494 | book_transaction | 2021-02-15 22:17:57.673458+00 | postgres | homework_1
    (1 row)
    ```
6. Запускаємо `docker exec -it dd_homework_1 psql -U postgres -d homework_1 -c "commit prepared 'book_transaction';"`
7. Вивід розблоковується:
    ```bash
    BEGIN
    INSERT 0 1
    UPDATE 1
    INSERT 0 1
    UPDATE 1
    INSERT 0 1
    psql:/sql/transaction.sql:13: ERROR:  new row for relation "accounts" violates check constraint "accounts_amount_check"
    DETAIL:  Failing row contains (1, John, -300).
    ROLLBACK
    ```