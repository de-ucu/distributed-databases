from pathlib import Path
from neo4j import GraphDatabase

def create_constraints(session):
    session.run(f'CREATE CONSTRAINT ON (item:Item) ASSERT item.id IS UNIQUE')
    session.run(f'CREATE CONSTRAINT ON (customer:Customer) ASSERT customer.id IS UNIQUE')
    session.run(f'CREATE CONSTRAINT ON (order:Order) ASSERT order.id IS UNIQUE')

def insert_items(session):
    session.run(f'''
        USING PERIODIC COMMIT 5000
        LOAD CSV WITH HEADERS FROM "file:///items.csv.gz" AS row
        CREATE (:Item {{id: row.StockCode, name: row.Description, price: row.UnitPrice}})
    ''')

def insert_customers(session):
    session.run(f'''
        USING PERIODIC COMMIT 5000
        LOAD CSV WITH HEADERS FROM "file:///customers.csv.gz" AS row
        CREATE (:Customer {{id: row.customer_id}})
    ''')

def insert_orders(session):
    session.run(f'''
        USING PERIODIC COMMIT 5000
        LOAD CSV WITH HEADERS FROM "file:///transactions.csv.gz" AS row
        CREATE (:Order {{id: row.order_id}})
    ''')

    session.run(f'''
        USING PERIODIC COMMIT 5000
        LOAD CSV WITH HEADERS FROM "file:///orders.csv.gz" AS row
        MATCH (order:Order {{id: row.InvoiceNo}})
        MATCH (customer:Customer {{id: row.CustomerID}})
        MATCH (item:Item {{id: row.StockCode}})
        CREATE (item)-[:BELONGS_TO {{quantity: row.Quantity}}]->(order)
        MERGE (order)-[:MADE_BY]->(customer)
    ''')

def insert_views(session):
    session.run(f'''
        USING PERIODIC COMMIT 5000
        LOAD CSV WITH HEADERS FROM "file:///views.csv.gz" AS row
        MATCH (customer:Customer {{id: row.CustomerID}})
        MATCH (item:Item {{id: row.StockCode}})
        CREATE (item)-[:VIEWED_BY]->(customer)
    ''')

def initialize():
    uri = "bolt://neo4j:7687"
    driver = GraphDatabase.driver(
        uri,
        auth=("neo4j", "password")
    )

    with driver.session() as session:
        create_constraints(session)
        insert_items(session) 
        insert_customers(session) 
        insert_orders(session) 
        insert_views(session)

if __name__ == '__main__':
    initialize()