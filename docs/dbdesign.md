## user

field | type
--- | ---
id | schema.object.id[key]
username | string
password | string
type | 0(student)\|\|1(teacher)\|\|100(andmin)
name | string

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

## major
field | type
--- | ---
major_code | integer
major_name | string
subject_team | integer

## subject_team

field | type
--- | ---
team_code | integer[key]
team_name | string

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
