## user

field | type
--- | ---
id | schema.object.id
username | string
password | string
type | 0(student)\|\|1(teacher)\|\|100(andmin)
name | string

## student

field | type
--- | ---
id | schema.object.id
name | string
password | string
school_number | string
class | integer
grade | integer
sex | integer

## teacher

field | type
--- | ---
id | schema.object.id
name | string
title | string

## subject
field | type
--- | ---
id | schema.object.id
name | string
time | integer

## studentrelsubject

field | type
--- | ---
student_id | string
subject_id | string

## teacherrelsubject

field | type
--- | ---
teacher_id | string
subject_id | string




