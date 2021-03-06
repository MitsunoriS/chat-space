# README

## DB設計

## users テーブル
| Column | Type | Options |
| ---------- | ------- | ----------- |
| name | string | index: true, null: false, unique: true |
| mail | string | null: false |
| password | string | null: false |

### Association
- has_many :messages
- has_many :members
- has_many :groups, through: members



## group テーブル
| Column | Type | Options |
| ---------- | ------- | ----------- |
| name | string | null: false |

### Association
- has_many :messages
- has_many :members
- has_many :users, through: members



## messages テーブル
| Column | Type | Options |
| ---------- | ------- | ----------- |
| user_id | reference | null :false, foreign_key: true |
| group_id | reference | null :false, foreign_key: true |
| body | text | |
| image | string | |

### Association
- belongs_to :user
- belongs_to :group



## members テーブル
| Column | Type | Options |
| ---------- | ------- | ----------- |
| user_id | reference | null: false, foreign_key: true |
| group_id | reference | null: false, foreign_key: true |

### Association
- belongs_to :group
- belongs_to :user


