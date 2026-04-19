import { motion } from 'framer-motion'
import { Card, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Mail, Lock, User, Venus, CheckCircle2Icon } from 'lucide-react'
import { Button } from '../components/ui/button'
import toast from 'react-hot-toast'
import { useState, useEffect } from 'react'
import type RegisterData from '../models/RegisterData'
import { useNavigate } from 'react-router'
import { registerUser } from '../api/services/AuthService'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { getGender } from '../api/services/AuthService'
import type Gender from '../models/Gender'
import { Alert, AlertTitle } from '../components/ui/alert'
import { Spinner } from '../components/ui/spinner'
import OAuth2SignupButtons from '../components/OAuth2SignupButtons'

function Signup() {
  const [data, setData] = useState<RegisterData>({
    userName: "",
    password: "",
    email: "",
    image: "",
    gender: "",
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [genders, setGenders] = useState<Gender[]>([]);
  const [error, setError] = useState<any>(null);

   useEffect(() => {
    getGender()
    .then((data)=> setGenders(data))
     .catch((err) => console.error("Gender load error:", err));
  }, []);

  // text input, email, password, number , textarea
  // handling form change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.name);
    // console.log(event.target.value);
    setData((value) => ({
      ...value,
      [event.target.name]: event.target.value,
    }));
  };

  // handling form submit
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(data);

    //validations
    if (data.userName.trim() === "") {
      toast.error("User Name is required !");
      return;
    } else if (data.password.trim() === "") {
      toast.error("Password is required !");
      return;
    } else if (data.email.trim() === "") {
      toast.error("Email is required !");
      return;
    } else if (data.gender.trim() === "") {
      toast.error("Gender is required !");
      return;
    }

    //form submit for registrations
    try {
      setLoading(true);

      const result = await registerUser(data);
      console.log(result);
      toast.success("User register successfully...");
      setData({
        userName: "",
        password: "",
        email: "",
        image: "",
        gender: "",
      });
      //navigate : login
      navigate("/login");
    } catch (error) {
      console.log(error);
      // toast.error("Error in registering the user...");
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <Card className="bg-card/70 backdrop-blur-xl border-border shadow-2xl rounded-2xl p-6">
          <CardContent>
            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-center"
            >
              Create Your Account
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center text-muted-foreground mt-2"
            >
              Join the next-generation authentication platform
            </motion.p>

            {/* error section */}
            {error && (
              <div className="mt-6">
                <Alert variant={"destructive"}>
                  <CheckCircle2Icon />
                  <AlertTitle>
                    {error?.response
                      ? error?.response?.data?.message
                      : error?.message}
                  </AlertTitle>
                </Alert>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="mt-8 space-y-6">
              {/* User Name */}
              <div className="space-y-2">
                <Label htmlFor="userName">User Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="userName"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10"
                    name="userName"
                    value={data.userName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    name="password"
                    value={data.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    name="email"
                    value={data.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <div className="relative">
                  <Venus className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Select
                    value={data.gender||""}
                    onValueChange={(value)=>setData((data)=>({...data, gender: value}))}
                  >
                    <SelectTrigger id='gender' className='pl-10 w-full'>
                      <SelectValue placeholder="Select Gender"/>
                    </SelectTrigger>
                    <SelectContent>
                      {
                        genders.map((g)=>(
                          <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button  disabled={loading} className="w-full rounded-2xl text-lg">
                {loading ? (
                  <>
                    <Spinner />
                    Please wait...
                  </>
                ) : (
                  "Sign Up"
                )}
                </Button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-4">
                <div className="flex-1 h-[1px] bg-border"></div>
                <span className="text-muted-foreground text-sm">OR</span>
                <div className="flex-1 h-[1px] bg-border"></div>
              </div>

              {/* OAuth Buttons */}
              <OAuth2SignupButtons />
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default Signup
