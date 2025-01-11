import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserRegistrationForm from "@/components/forms/register/user";

function Register() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5">
      <Tabs defaultValue="user" className="w-fit">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="user">User</TabsTrigger>
          <TabsTrigger value="workshop">Workshop</TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <UserRegistrationForm />
        </TabsContent>
        <TabsContent value="workshop">
          <Card>
            <CardHeader>
              <CardTitle>Workshop Account</CardTitle>
              <CardDescription>
                Enrich your online presence and gain valuable customer.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Register;
