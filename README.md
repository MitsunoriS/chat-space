# README

## DB設計

## User テーブル
| Column | Type | Options |
| ---------- | ------- | ----------- |
| name | string | index: true, null: false, unique: true |
| mail | string | null: false |
| password | string | null: false |

### Association
- has_many :groups, through: members
- has_many :messages
- has_many :members



## group テーブル
| Column | Type | Options |
| ---------- | ------- | ----------- |
| user_id | integer | null: false, foreign_key: sure |
| group_id | integer | |

### Association
- has_many :user
- has_many :messages
- has_many :members



## messages テーブル
| Column | Type | Options |
| ---------- | ------- | ----------- |
| user_id | integer | null :false, foreign_key: true |
| group_id | integer | null :false, foreign_key: true |
| body | text | |
| image | string | |

### Association
- belongs_to :user
- belongs_to :group



## members テーブル
| Column | Type | Options |
| ---------- | ------- | ----------- |
| user_id | integer | null: false, foreign_key: true |
| group_id | integer | null: false, foreign_key: true |

### Association
- belongs_to :group
- belongs_to :user


