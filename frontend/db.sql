SELECT 
    foods.name AS food_name,
    goals.goal_name AS goal
FROM food_goals
JOIN foods ON food_goals.food_id = foods.id
JOIN goals ON food_goals.goal_id = goals.id
ORDER BY goals.id, foods.id;