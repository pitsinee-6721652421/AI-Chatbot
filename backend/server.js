const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());


// =========================
// ทดสอบ Server
// =========================
app.get('/', (req, res) => {
    res.json({
        message: 'Healthy Foods Chatbot API is running'
    });
});


// =========================
// ดึง Goals ทั้งหมด
// =========================
app.get('/api/goals', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT *
            FROM goals
            ORDER BY id
        `);

        res.json(rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'ไม่สามารถดึงข้อมูลเป้าหมายได้'
        });
    }
});


// =========================
// ดึงอาหารทั้งหมด
// =========================
app.get('/api/foods', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                foods.id,
                foods.name,
                foods.description,
                foods.calories,
                foods.protein,
                foods.fat,
                foods.carbs,
                foods.image,
                foods.allergens,
                food_categories.category_name
            FROM foods
            LEFT JOIN food_categories
                ON foods.category_id = food_categories.id
            ORDER BY foods.id
        `);

        res.json(rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'ไม่สามารถดึงข้อมูลอาหารได้'
        });
    }
});


// =========================
// ดึงอาหารตาม Goal
// =========================
app.get('/api/foods/goal/:goalId', async (req, res) => {

    const goalId = req.params.goalId;

    try {
        const [rows] = await db.query(`
            SELECT
                foods.id,
                foods.name,
                foods.description,
                foods.calories,
                foods.protein,
                foods.fat,
                foods.carbs,
                foods.image,
                foods.allergens,
                food_categories.category_name,
                goals.goal_name
            FROM foods

            INNER JOIN food_goals
                ON foods.id = food_goals.food_id

            INNER JOIN goals
                ON food_goals.goal_id = goals.id

            LEFT JOIN food_categories
                ON foods.category_id = food_categories.id

            WHERE goals.id = ?

            ORDER BY foods.id
        `, [goalId]);

        res.json(rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'ไม่สามารถดึงอาหารตามเป้าหมายได้'
        });
    }
});


// =========================
// Recommendation
// =========================
app.get('/api/recommendations', async (req, res) => {

    const { goal, allergy } = req.query;

    if (!goal) {
        return res.status(400).json({
            error: 'กรุณาระบุ goal'
        });
    }

    try {

        let sql = `
            SELECT
                foods.id,
                foods.name,
                foods.description,
                foods.calories,
                foods.protein,
                foods.fat,
                foods.carbs,
                foods.image,
                foods.allergens,
                food_categories.category_name,
                goals.goal_name
            FROM foods

            INNER JOIN food_goals
                ON foods.id = food_goals.food_id

            INNER JOIN goals
                ON food_goals.goal_id = goals.id

            LEFT JOIN food_categories
                ON foods.category_id = food_categories.id

            WHERE goals.id = ?
        `;

        const params = [goal];

        // กรองอาหารที่แพ้
        if (allergy && allergy !== 'ไม่มี') {

            sql += `
                AND (
                    foods.allergens IS NULL
                    OR foods.allergens NOT LIKE ?
                )
            `;

            params.push(`%${allergy}%`);
        }

        sql += `
            ORDER BY foods.id
            LIMIT 3
        `;

        const [rows] = await db.query(sql, params);

        res.json(rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'ไม่สามารถแนะนำอาหารได้'
        });
    }
});


// =========================
// บันทึก User
// =========================
app.post('/api/users', async (req, res) => {

    const {
        name,
        age,
        gender,
        goal_id,
        allergy
    } = req.body;

    if (!name || !age) {
        return res.status(400).json({
            error: 'กรุณากรอกชื่อและอายุ'
        });
    }

    try {

        const [result] = await db.query(`
            INSERT INTO users
            (name, age, gender, goal_id, allergy)
            VALUES (?, ?, ?, ?, ?)
        `, [
            name,
            age,
            gender || null,
            goal_id || null,
            allergy || null
        ]);

        res.status(201).json({
            message: 'บันทึกผู้ใช้สำเร็จ',
            user_id: result.insertId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'ไม่สามารถบันทึกข้อมูลผู้ใช้ได้'
        });
    }
});


app.get('/api/users', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT
                users.id,
                users.name,
                users.age,
                users.gender,
                goals.goal_name,
                users.allergy
            FROM users
            LEFT JOIN goals ON users.goal_id = goals.id
            ORDER BY users.id DESC
        `);

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'ไม่สามารถดึงข้อมูลผู้ใช้ได้'
        });
    }
});

// =========================
// Start Server
// =========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});