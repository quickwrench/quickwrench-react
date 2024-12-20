import "./loginBtn.css"
export default function Login_form() {
  return (
    <>
    <div className="login" style={{display:"flex", flexDirection:"column",height:"30%", width:"40%",justifySelf:"center"}}>
     <form style={{height:"100%",width:"100%" ,display:"flex", flexDirection:"column"}}>
        <input type="text" placeholder="USERNAME"  />
        <input type="password" placeholder="PASSWORD"  />
        <button>Login</button>
     </form> 
     <div style={{marginTop:"10px"}}>
       <span>don`t have an account? </span>
       <a href=""> sign up</a>
     </div>
    </div>
    </>
  );
}