import axios from 'axios';

export const chat = async (req, res, next) => {
  const { email } = req.body;
  // Get or create user on Chat Engine!
  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: email, secret: email, first_name: email },
      { headers: { "Private-Key": "c5455632-5e1e-4a70-a304-5921618c1720" } }
    );

    console.log(email);
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
};
