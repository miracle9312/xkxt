## user

field | type
--- | ---
id | schema.object.id[key]
username | string
password | string
role | 0(student)\|\|1(teacher)\|\|100(andmin)
nickname | string
createdAt | date
updatedAt | date

## student

field | type
--- | ---
id | schema.object.id[key]
name | string
password | string
school_number | string
class | integer
grade | integer
sex | integer
major | integer

## teacher

field | type
--- | ---
id | schema.object.id[key]
name | string
title | string

## subject
field | type
--- | ---
id | schema.object.id[key]
name | string
time | integer
subject_team | string

## subject_team

field | type
--- | ---
team_code | integer[key]
team_name | string
major | integer

## student_subject_rel

field | type
--- | ---
student_id | string
subject_id | string

## teacher_subject_rel

field | type
--- | ---
teacher_id | string[key]
subject_id | string

## subject_team_rel
field | type
--- | ---
team_code | integer
subject | string
