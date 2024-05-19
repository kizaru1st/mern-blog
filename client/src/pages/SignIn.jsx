import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import axios from "axios";
import { SignInFailure, SignInStart, SignInSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage} = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(SignInFailure("Please fill in all the fields"));
    }
    try {
      dispatch(SignInStart());
      const res = await axios.post("/api/v1/auth/signin", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.success === false) {
        return dispatch(SignInFailure(res.data.message));
      }
      dispatch(SignInSuccess(res.data));
      navigate("/");
    } catch (error) {
      dispatch(SignInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        {/* LEFT */}
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Nakama
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">This is demo project</p>
        </div>

        {/* RIGHT */}
        <div className="flex-1">
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone={"purpleToPink"}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm">
                    <span className="pl-3">Loading...</span>
                  </Spinner>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don`t have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert color="failure" className="mt-5">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
