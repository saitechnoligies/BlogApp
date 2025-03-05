const UserAuthor = require("../Models/userAuthorModel");

async function createUserOrAuthor(req, res) {
  const newAcc = req.body;
  const userIndb = await UserAuthor.findOne({ email: newAcc.email });
  console.log(newAcc);
  console.log("hello")
  console.log(userIndb)

  if (userIndb !== null) {
    
    if (newAcc.role === userIndb.role) {
      console.log("if")
      res.status(200).send({ message: newAcc.role, payload: userIndb });
    } else {
      console.log("else")
      res.status(200).send({ message: "Invalid role" });
    }
  } else {
    let newUser = new UserAuthor(newAcc);
    let newUserOrAuthorDoc = await newUser.save();
    res.status(201).send({ message: newUserOrAuthorDoc.role, payload: newUserOrAuthorDoc });
  }
  // console.log(newAcc)
}

module.exports = createUserOrAuthor;
