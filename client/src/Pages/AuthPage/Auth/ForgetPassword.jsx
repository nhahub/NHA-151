import { Button } from "../../../Components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../Components/ui/dialog";
import { Input } from "../../../Components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { forgotPassword } from "../../../lib/api/api";

export function ForgotPasswordDialog({ forgetPassword, setForgetPassword }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    if (!data.email) {
      alert("❌ Please enter your email.");
      return;
    }

    console.log("Forgot Password payload:", data);
    console.log("Payload being sent:", { email: data.email });

    try {
      const response = await forgotPassword({ email: data.email });
      console.log("Forgot Password response:", response.data);
      alert("✅ Check your email for reset instructions.");
      reset();
      setForgetPassword(false);
    } catch (err) {
      console.error("Forgot Password error:", err.response || err);
      const msg =
        err.response?.data?.message ||
        "Something went wrong! Please check your email and try again.";
      alert(msg);
    }
  };

  return (
    <Dialog open={forgetPassword} onOpenChange={setForgetPassword}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Reset your password</DialogTitle>
            <DialogDescription>
              Enter your email address below and we’ll send you instructions to
              reset your password.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 my-8">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email", { required: true })}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={() => setForgetPassword(false)}
                type="button"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Send Reset Link</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
