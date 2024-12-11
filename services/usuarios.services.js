import { sequelize } from '../libs/sequelize.js';

async function index(){
    const users = await sequelize.models.user.findAll()
    return users
}

async function create(user){
    const newUser = await sequelize.models.user.create({
        username: user.username,
        password: user.password
    });
    return newUser
}

async function show(id){
    const user = await sequelize.models.user.findByPk(id)
    return user
}

async function update(id, user){
    const searchedUser = sequelize.models.user.findByPk(id)
    if(!searchedUser) {
        return false
    }
   const [rowsAffected, [updatedUser]] = await sequelize.models.user.update({
    username: user.username,
    password: user.password
    }, {
        where: {
            id
        },
        returning: true
    })
    return updatedUser
}

async function destroy(id) {
    const user = await sequelize.models.user.findByPk(id);

    if (!user) {
        return null;
    }
    await user.destroy();
    return user;
}


        
export {
    index,
    create,
    show,
    update,
    destroy
}