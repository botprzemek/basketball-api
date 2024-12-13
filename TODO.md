# System

GraphQL
Redis
CockroachDB
Clustering

Streams
Event Emitter
Design patterns

REPLACE EXPRESS WITH PLAIN HTTP

# Models

## League

id
name
created_at
updated_at
deleted_at
is_deleted

## Season

id
league_id
name
started_at
finished_at
created_at
updated_at
deleted_at
is_deleted

## Team

id
league_id
name
created_at
updated_at
deleted_at
is_deleted

## Standing

id
season_id
team_id
wins
loses

## Identity

id
first_name
last_name

## Physical Attributes

id
weight
height
wingspan
effected_at
expiried_at

## Player

id
identity_id
physical_attributes_id
team_id
number
position
main_hand
birth_date
created_at
updated_at
deleted_at
is_deleted

## Player details (View)

id
first_name
last_name
number
position
main_hand
birth_date
weight
height
wingspan

## Coach

id
identity_id
team_id
created_at
updated_at
deleted_at
is_deleted

## Arena

id
name
location

## Schedule

id
arena_id
match_id
started_at
is_finished

## Match

id
schedule_id
home_id
guest_id

## Quarter

id
match_id
quarter_number
started_at
ended_at

## Player Quarter Statistics

id
player_id
quarter_id
minutes
two_fgm
two_fga
three_fgm
three_fga
freethrow_fgm
freethrow_fga
offensive_rebounds
defensive_rebounds
assists
steals
blocks
turnovers
fouls

## Player Match Statistics (View)

match_id
player_id
minutes
points
two_fgm
two_fga
three_fgm
three_fga
freethrow_fgm
freethrow_fga
offensive_rebounds
defensive_rebounds
rebounds
assists
steals
blocks
turnovers
fouls
eval
per

## Player Average Statistics (View)

player_id
minutes
points
two_fgm
two_fga
three_fgm
three_fga
freethrow_fgm
freethrow_fga
offensive_rebounds
defensive_rebounds
rebounds
assists
steals
blocks
turnovers
fouls
eval
per

## Team Match Statistics (View)

match_id
team_id
minutes
points
two_fgm
two_fga
three_fgm
three_fga
freethrow_fgm
freethrow_fga
offensive_rebounds
defensive_rebounds
rebounds
assists
steals
blocks
turnovers
fouls
eval
per

## Team Average Statistics (View)

team_id
points
two_fgm
two_fga
three_fgm
three_fga
freethrow_fgm
freethrow_fga
offensive_rebounds
defensive_rebounds
rebounds
assists
steals
blocks
turnovers
fouls
eval
per

## Match Log

id
player_id
quarter_id
x_position
y_position
type (statistics)
is_succeed
created_at

## Player Injury

id
player_id
severity
description
started_at
recovered_at

## Trainings

id
team_id
description
started_at
ended_at

## Player Trainings

player_id
training_id
is_present

## Player Presence (View)

player_id
from
to
present

## Achivements

id
title
description
achieved_at