import { Users } from "../models/Users";
import Validator from "validatorjs";
import { sign, verify } from "jsonwebtoken";
import { compare, hash } from "bcryptjs";
import type { Context } from "hono";

const JWT_SECRET = 'aQD7e4s25RpeoFtLes@g8toHMDZx&&h#Yg%75PYN'
export default class AuthController {

  async login(request : Context){
    const body = await request.req.json()
    const { email, password } = body;

    
     let rules = {
            email       : 'required',
            password    : 'required'
        };

    let validation = new Validator(body, rules);
    if (validation.fails()) {
        return Response.json({
            status: 422,
            messages: "Validation Failed",
            data: validation.errors.all()
        });
    }

    const user = await Users.where('email', email).fetch({require: false , withRelated: ['role']});
    if (!user) {
      return Response.json({
        status: 401,
        messages: "Invalid username or password",
      });
    }
     const match = await compare(password, user.get('password'))
        if (!match) {
            return Response.json({ 
                status : 401,
                message: 'Invalid credentials'
            })
        }
     const token = sign({ email: user.get('email'), role: user.related('role').get('name') }, JWT_SECRET, { expiresIn: '1y' })
        return Response.json({ 
            status  : 200,
            message : 'Success logined',
            data    : {
                key     : token,
                email   : email
            }
        })   
 }


  async register(request : Context){
    const payload  = await request.req.json();
    
     let rules = {
            username    : 'required',
            email       : 'required|email',
            password    : 'required|min:6'
            
        };
         
      
    let validation = new Validator(payload , rules);
        if(validation.fails()){
            return Response.json({
                status  : 422,
                message : 'Validation failed',
                data    : validation.errors.all()
            })
        }

      const checkUser      = await Users.where('email', payload.email).fetch({ require: false })
        if(checkUser) {
            return Response.json({
                status  : 422,
                message : 'The email has been registered',
                data    : {
                    email: ['The email has been registered']
                }
            })
        }  
        
      try {
        await new Users({
            username    : payload.username,
            email       : payload.email,
            password    : await hash(payload.password, 10),
            role_id     : 2
        }).save()

        return Response.json({ 
            status  : 201,
            message : 'Registration successful',
        })

      } catch (error) {

        return Response.json({
            status  : 500,
            message : 'Registration failed',
            data    : error
        })
      }

 }
 


}