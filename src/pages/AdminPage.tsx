
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { isAuthenticated, logout } from "@/utils/auth";
import { getSubscribers, removeSubscriber, Subscriber } from "@/utils/newsletterStorage";
import { LogOut, Trash2, Users } from "lucide-react";
import { toast } from "sonner";

const AdminPage = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    
    // Load subscribers
    loadSubscribers();
  }, [navigate]);
  
  const loadSubscribers = () => {
    const subs = getSubscribers();
    setSubscribers(subs);
  };
  
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };
  
  const handleRemoveSubscriber = (id: string) => {
    if (window.confirm("Are you sure you want to remove this subscriber?")) {
      const result = removeSubscriber(id);
      if (result) {
        toast.success("Subscriber removed successfully");
        loadSubscribers();
      } else {
        toast.error("Failed to remove subscriber");
      }
    }
  };
  
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-light">Newsletter Admin</h1>
        <Button 
          variant="outline" 
          className="border-slate-dark hover:bg-navy-dark hover:text-cyan"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
      
      <Card className="border-slate-dark bg-navy-light mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-light">
            <Users className="mr-2 h-5 w-5 text-cyan" />
            Subscriber List
          </CardTitle>
        </CardHeader>
        <CardContent>
          {subscribers.length === 0 ? (
            <div className="text-center py-8 text-slate">
              No subscribers yet
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Date Subscribed</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell className="font-medium">{subscriber.email}</TableCell>
                    <TableCell>{formatDate(subscriber.timestamp)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRemoveSubscriber(subscriber.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-100/10"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
