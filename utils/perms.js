// objects to set role requirments for commands.

//for admin only commands 
const Admin = [
  {
    id:"742243945693708381",
    type: "ROLE",
    permission: false,
  }
]

//for commands that users can access after reaching the first rank
const Luna = [
  {
    id: "748494880229163021",
    type: "ROLE",
    permission: false,
  }
]

modules.exports = { Admin, Luna };