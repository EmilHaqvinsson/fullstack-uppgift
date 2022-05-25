import jwt from 'jsonwebtoken'

const checkAuth = (req: { headers: { authorization: string; }; userData: { email: any; userId: any; }; },
  res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }, next: () => void): void => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      "secret_this_should_be_longer"
    ); req.userData = {
      email: decodedToken,
      userId: decodedToken
    }; next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
}
  
  export default checkAuth