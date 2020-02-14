const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'loginexample',
    password: 'root',
    port: 5433,
});

const getUsers = async (req, res) => {
  const result = await pool.query('SELECT * FROM account');
  res.status(200).json(result.rows);
};

const getUsersid = async (req, res) => {
  const user_id = req.params.user_id;
  const result = await pool.query('SELECT * FROM account WHERE user_id = $1', [user_id]);
  res.status(200).json(result.rows);

};


const createUser = async (req, res) => {
  const { username, password, email } = req.body;
  const response = await pool.query('INSERT INTO account (username, password, email) VALUES ($1, $2, $3)', [username, password, email]);
  res.json({
      message: 'User Added successfully',
      body: {
          user: {username, password, email}
      }
  })
};


const updateUser = async (req, res) => {
  const user_id = req.params.user_id;
  const { username, password, email } = req.body;

  const result = pool.query('UPDATE account SET username = $1, password = $2, email = $3 WHERE user_id = $4', [username, password, email, user_id]);
  res.json('User Updated Successfully');
};

const deleteUser = async (req, res) => {
  const user_id = req.params.user_id;
   pool.query('DELETE FROM account where user_id = $1', [
      user_id
  ]);
  res.status(200).send('Delete user');
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUsersid
};