# Foodstuff Ordering System - Database ERD

```mermaid
erDiagram
    users ||--o{ orders : places
    users ||--o{ reviews : writes
    orders ||--o{ order_items : contains
    orders ||--o{ payments : has
    products ||--o{ order_items : included_in
    products ||--o{ reviews : receives
    categories ||--o{ products : categorizes

    users {
        id integer PK
        name string
        email string UNIQUE
        email_verified_at timestamp
        password string
        remember_token string
        created_at timestamp
        updated_at timestamp
    }

    categories {
        id integer PK
        name string
        slug string UNIQUE
        description text
        created_at timestamp
        updated_at timestamp
    }

    products {
        id integer PK
        name string
        slug string UNIQUE
        description text
        price integer
        stock integer
        images json
        category_id integer FK
        is_active boolean
        created_at timestamp
        updated_at timestamp
    }

    orders {
        id integer PK
        user_id integer FK
        subtotal integer
        shipping integer
        total integer
        status string
        payment_status string
        delivery_address json
        created_at timestamp
        updated_at timestamp
    }

    order_items {
        id integer PK
        order_id integer FK
        product_id integer FK
        qty integer
        price integer
        total integer
        created_at timestamp
        updated_at timestamp
    }

    payments {
        id integer PK
        order_id integer FK
        reference string UNIQUE
        status string
        type string
        amount integer
        metadata json
        created_at timestamp
        updated_at timestamp
    }

    reviews {
        id integer PK
        user_id integer FK
        product_id integer FK
        rating integer
        comment text
        approved boolean
        created_at timestamp
        updated_at timestamp
    }
```