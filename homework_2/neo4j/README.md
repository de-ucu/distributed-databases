### Завдання 1
Знайти Items які входять в конкретний Order

```sql
MATCH x=(o:Order)<-[:BELONGS_TO]-(:Item)
WHERE o.id = '537808'
RETURN x
```

![alt text](images/1.svg "Завдання 1")

### Завдання 2
Підрахувати вартість конкретного Order

```sql
MATCH (o:Order)<-[b:BELONGS_TO]-(i:Item)
WHERE o.id = '537808'
WITH toInteger(b.quantity) as quantity, toFloat(i.price) as price
RETURN sum(price * quantity)
```

![alt text](images/2.jpg "Завдання 2")

### Завдання 3
Знайти всі Orders конкретного Customer

```sql
MATCH x=(:Order)-[:MADE_BY]->(c:Customer)
WHERE c.id = '15301'
RETURN x
```

![alt text](images/3.svg "Завдання 3")

### Завдання 4
Знайти всі Items куплені конкретним Customer (через Order)

```sql
MATCH x=(:Item)-[:BELONGS_TO]->(:Order)-[:MADE_BY]->(c:Customer)
WHERE c.id = '15301'
RETURN x
```

![alt text](images/4.svg "Завдання 4")

### Завдання 5
Знайти кількість Items куплені конкретним Customer (через Order)

```sql
MATCH (i:Item)-[:BELONGS_TO]->(:Order)-[:MADE_BY]->(c:Customer)
WHERE c.id = '15301'
RETURN count(i)
```

![alt text](images/5.jpg "Завдання 5")

### Завдання 6
Знайти для Customer на яку суму він придбав товарів (через Order)

```sql
MATCH (i:Item)-[b:BELONGS_TO]->(:Order)-[:MADE_BY]->(c:Customer)
WHERE c.id = '15301'
WITH toInteger(b.quantity) as quantity, toFloat(i.price) as price
RETURN sum(quantity * price)
```

![alt text](images/6.jpg "Завдання 6")

### Завдання 7
Знайті скільки разів кожен товар був придбаний, відсортувати за цим значенням

```sql
MATCH (i:Item)-[b:BELONGS_TO]->(:Order)
WITH i.name as name, count(b) as c
RETURN name, c ORDER BY c DESC LIMIT 10
```

![alt text](images/7.jpg "Завдання 7")

### Завдання 8
Знайти всі Items переглянуті (view) конкретним Customer

```sql
MATCH x=(:Item)-[:VIEWED_BY]->(c:Customer)
WHERE c.id = '15301'
RETURN x
```

![alt text](images/8.svg "Завдання 8")

### Завдання 9
Знайти інші Items що купувались разом з конкретним Item (тобто всі Items що входять до Order-s разом з даними Item)

```sql
MATCH (i:Item)-[:BELONGS_TO]->(:Order)<-[:BELONGS_TO]-(n:Item)
WHERE i.id = '20770'
RETURN n
```

![alt text](images/9.svg "Завдання 9")

### Завдання 10
Знайти Customers які купили даний конкретний Item

```sql
MATCH x=(i:Item)-[:BELONGS_TO]->(:Order)-[:MADE_BY]-(c:Customer)
WHERE i.id = '20770'
RETURN x
```

![alt text](images/10.svg "Завдання 10")

### Завдання 11
Знайти для певного Customer(а) товари, які він переглядав, але не купив

```sql
MATCH x=(i:Item)-[:VIEWED_BY]->(c:Customer)
WHERE c.id = '14000' AND NOT (i)-[:BELONGS_TO]->(:Order)-[:MADE_BY]-(c)
return x
```

![alt text](images/11.svg "Завдання 11")
