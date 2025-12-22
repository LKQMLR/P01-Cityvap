import { createAdmin } from "../models/adminModel.js";

export const addAdmin = (req, res) => {
  const {pseudo, password, role} = req.body;

  try {
    const result = createAdmin.run(pseudo, password, role)
    res.status(201).json({
      id: result.lastInsertRowid,
      pseudo,
      role
    })
  }catch(error) {
    res.status(500).json({error : error.message})
  }
}
