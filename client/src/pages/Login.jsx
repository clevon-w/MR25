/**
 * Register Page
 */

 import {useState, useEffect} from 'react'
 import {FaSignInAlt, FaUser} from 'react-icons/fa'
 
 /**
  * Collects data from the user and stores it in formData to be used
  */
 function Login() {
     const [formData, setFromData] = useState({
         email: '',
         password: '',
     })
 
     const {email,password} = formData
 
     /**
      * 
      * @Returns enables the placeholder to be editted
      * target.name is the field the cursor is in and target.value is the new value entered
      */
     const onChange = (e) => {
         setFromData((prevState) => ({
             ...prevState,
             [e.target.name]: e.target.value
         }))
     }
 
     /**
      * 
      * @param {} e 
      * Event listner
      */
     const onSubmit = (e) => {
         e.preventDefault()
     }
 
     /**
      * creating the register form
      */
     return <>
       <section className='header'>
         <h1>
           <FaSignInAlt /> Login
         </h1>
         <p>Please create an account</p>
       </section>
 
         <section className='form'>
           <form onSubmit = {onSubmit}>
             <div className="form-group">
               <input 
               type='email' 
               className='form-control' 
               id='email' 
               name='email'
               value={email}
               placeholder='Please enter your email'
               onChange={onChange}/> 
             </div>
 
             <div className="form-group">
               <input 
               type='password' 
               className='form-control' 
               id='password' 
               name='password'
               value={password}
               placeholder='Please enter a password'
               onChange={onChange}/> 
             </div>

             <div className="form-group">
                 <button type="sumbit" className='btn-submit'>Submit</button>
             </div>
           </form>
       </section>
     </>
 }
 export default Register
 