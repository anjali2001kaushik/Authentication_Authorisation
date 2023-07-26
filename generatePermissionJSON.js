const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const permissionMap = {
  "createUser": "CREATE_USER",
  "viewUserDetails": "READ_USER_DETAILS",
  "updateUserDetails": "UPDATE_USER_DETAILS",
  "deleteUser": "DELETE_USER",
  "listUsers": "LIST_USERS",
  "assignRoles": "ASSIGN_ROLES",
  "managePermissions": "MANAGE_PERMISSIONS",
  "deactivateUser": "DEACTIVATE_USER",
  "resetPassword": "RESET_PASSWORD",
  "viewActivityLogs": "VIEW_ACTIVITY_LOGS"
};

function generateRandomPermission() {
  const permissions = Object.values(permissionMap);
  const randomPermission = permissions[Math.floor(Math.random() * permissions.length)];

  return {
    "id": uuidv4(),
    "name": randomPermission,
    "description": `Allows ${randomPermission.replace(/_/g, ' ').toLowerCase()} of Users`,
    "isActive": true
  };
}

function generatePermissionsJSON() {
  const permissionsArray = [];
  for (let i = 0; i < 9; i++) {
    permissionsArray.push(generateRandomPermission());
  }

  const permissionsJSON = {
    "permissions": permissionsArray
  };

  return JSON.stringify(permissionsJSON, null, 2);
}

const jsonOutput = generatePermissionsJSON();

fs.writeFile('./json/permissions.json', jsonOutput, (err) => {
  if (err) {
    console.error('Error writing JSON file:', err);
  } else {
    console.log('JSON file successfully generated!');
  }
});
