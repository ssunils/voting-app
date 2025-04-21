import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
];

export default function PublicVoting() {
    const [selected, setSelected] = useState<string>("");
    const [voted, setVoted] = useState(false);


    const handleVote = () => {
        setVoted(true);
        // Handle the vote submission logic here
        // console.log("Voted:", selected);
    };



    return (
        <div className="max-w-xl mx-auto mt-12 p-4">
            <div className="mb-20">
                <h1 className="text-xl font-bold mb-0">Welcome, Arul Raj</h1>
                <p>Member No: 1234A</p>
            </div>
            <div className="h-full flex items-center">
            <Card className="">
                <CardContent className="space-y-4 p-6">
                    <h2 className="text-2xl font-bold">Do you support the new community park?</h2>

                    {!voted ? (
                        <>
                            <RadioGroup onValueChange={setSelected} className="space-y-2">
                                {options.map((opt) => (
                                    <div key={opt.value} className="flex items-center space-x-2">
                                        <RadioGroupItem value={opt.value} id={opt.value} />
                                        <Label htmlFor={opt.value}>{opt.label}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                            <Button onClick={handleVote} disabled={!selected} className="w-full">
                                Vote
                            </Button>
                        </>
                    ) : (
                        <div className="space-y-4">

                            <p className="text-center text-sm text-muted-foreground">
                                Thanks for voting! Please wait for the results to be announced.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
            </div>

        </div>
    );
}
