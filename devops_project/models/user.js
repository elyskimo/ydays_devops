// const db = require('sqlite')
const Redis = require('ioredis')
const redis = new Redis()

module.exports = {
  get: async (userId) => {
    const user = await redis.hgetall(`user:${userId}`)
    return user
  },

  count: async() => {
   return await redis.scard('users')	
//  return redis.dbsize()	
  },

  getAll: async (limit, offset) => {
    // console.log(await redis.keys('user:*'))
    let users=[]
    let userKeys = await redis.smembers('users')
    //console.log(await redis.hget(userKeys[0],"pseudo"))
    for (let index = 0; index < userKeys.length; index++) {
      //console.log(await redis.hgetall(userKeys[index],"pseudo"))
      const user = await redis.hgetall(`user:${userKeys[index]}`)
      user['rowid']=userKeys[index]
      users.push(user)
      
    }
   
   return users
   //return redis.zrange('user',0,-1)
  },

  insert: async (params) => {
	const pipeline = redis.pipeline()
	const userId = require('uuid').v4()
  
  pipeline.sadd('users',userId)
	pipeline.hmset(`user:${userId}`, {
    id: userId,
		pseudo: params.pseudo,
		firstname: params.firstname,
		lastname: params.lastname,
		email: params.email,
		password: params.password})

	// pipeline.sadd('users', userId)

	return await pipeline.exec()

  },

  update: async(userId, params) => {
    const pipeline = redis.pipeline()
    
    pipeline.hmset(`user:${userId}`, {
    id: userId,
		pseudo: params.pseudo,
		firstname: params.firstname,
		lastname: params.lastname,
		email: params.email,
		password: params.password})

    // pipeline.sadd('users', userId)

    return await pipeline.exec()
 
  },

  remove: async(userId) => {
    const pipeline = redis.pipeline()
    pipeline.srem('users',userId)
    pipeline.del(`user:${userId}`)
    return await pipeline.exec()
  }

}
