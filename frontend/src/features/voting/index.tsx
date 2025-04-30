import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSessionQuery } from "@/hooks/use-session-query";
import { useLatestPoll } from "@/hooks/voting/use-get-latest-poll";
import { useCastVote } from "@/hooks/voting/use-cast-vote";

const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
];

export default function Voting() {
    const [selected, setSelected] = useState<any>();
    const [voted, setVoted] = useState(true);
    const { data: userData } = useSessionQuery();
    const { data: latestPoll } = useLatestPoll();
    const { mutate } = useCastVote();

    useEffect(() => {
        setSelected(undefined);
        if (latestPoll?.poll === null) {
            setVoted(true);
        } else {
            setVoted(false);
        }
    }, [latestPoll])


    const handleVote = () => {
        if (selected) {
            mutate({
                poll_id: latestPoll?.poll?.id,
                vote_choice: selected,
            }, {
                onSuccess: () => {
                    setVoted(true);
                }
            });
        }
    };
    if (!userData) {
        return (
            <div className="max-w-xl mx-auto mt-12 p-4">
                <h1 className="text-xl font-bold mb-0">Please login to vote</h1>
            </div>
        )
    }

    return (
        <div className="max-w-xl mx-auto mt-12 p-4">
            <div className="mb-20">
                <h1 className="text-xl font-bold mb-0">Welcome, {userData?.name}</h1>
                <p>Member No: {userData?.member_id}</p>
            </div>
            <div className="h-full flex items-center">
                <Card className="min-w-[300px] w-full mx-auto">
                    <CardContent className="space-y-4 p-6">


                        {voted ? (
                            <div className="space-y-4">
                                <p className="text-center text-sm text-muted-foreground">
                                    Thanks for voting! Please wait for the results to be announced.
                                </p>
                            </div>
                        ) : (

                            <>
                                <h2 className="text-2xl font-bold">
                                    {latestPoll?.poll?.title}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    {latestPoll?.poll?.description}
                                </p>
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
                        )}
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}
