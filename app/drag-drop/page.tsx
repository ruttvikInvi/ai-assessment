"use client"

import { useState } from "react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, User } from "lucide-react"

// Types
type Candidate = {
  id: string
  name: string
  role: string
  avatar?: string
  bio?: string
}

type Interviewee = {
  id: string
  name: string
  position: string
  avatar?: string
  candidates: Candidate[]
}

// Initial data
const initialCandidates: Candidate[] = [
  {
    id: "c1",
    name: "Alex Johnson",
    role: "Frontend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Passionate about UI/UX and loves working with React.",
  },
  {
    id: "c2",
    name: "Sam Wilson",
    role: "Backend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Enjoys building scalable APIs and solving backend puzzles.",
  },
  {
    id: "c3",
    name: "Taylor Swift",
    role: "Product Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Skilled in agile methodologies and cross-functional leadership.",
  },
  {
    id: "c4",
    name: "Jamie Lee",
    role: "UX Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Focused on creating user-centered designs and wireframes.",
  },
  {
    id: "c5",
    name: "Morgan Freeman",
    role: "DevOps Engineer",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Expert in CI/CD pipelines, cloud infrastructure, and automation.",
  },
  {
    id: "c6",
    name: "Chris Evans",
    role: "Full Stack Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Comfortable across the stack with a love for clean code.",
  },
];


const initialInterviewees: Interviewee[] = [
  {
    id: "i1",
    name: "Emma Thompson",
    position: "Senior Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    candidates: [],
  },
  {
    id: "i2",
    name: "Michael Chen",
    position: "Tech Lead",
    avatar: "/placeholder.svg?height=40&width=40",
    candidates: [],
  },
  {
    id: "i3",
    name: "Sarah Johnson",
    position: "Engineering Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    candidates: [],
  },
  {
    id: "i4",
    name: "David Rodriguez",
    position: "CTO",
    avatar: "/placeholder.svg?height=40&width=40",
    candidates: [],
  },
]

// Drag and Drop Components
const CandidateCard = ({
  candidate,
  isAssigned = false,
  onRemove,
}: {
  candidate: Candidate
  isAssigned?: boolean
  onRemove?: () => void
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "candidate",
    item: { id: candidate.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
  ref={drag}
  className={`${isDragging ? "opacity-50" : "opacity-100"} cursor-move`}
>
  <Card className={`mb-2 ${isAssigned ? "border-green-200 bg-green-50" : ""} w-300`}>
    <CardContent className="p-3 flex items-center gap-3">
      <Avatar>
        <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
        <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <h3 className="font-medium text-sm">{candidate.name}</h3>
        <p className="text-xs text-muted-foreground">{candidate.role}</p>
        {candidate.bio && (
          <p
            className="text-xs text-muted-foreground truncate max-w-[160px]"
            title={candidate.bio}
          >
            {candidate.bio.length > 10 ? `${candidate.bio.slice(0, 10)}...` : candidate.bio}
          </p>
        )}
      </div>

      {isAssigned && onRemove && (
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 text-xs"
          aria-label="Remove candidate"
        >
          ✕
        </button>
      )}
    </CardContent>
  </Card>
</div>

  )
}

const IntervieweeColumn = ({
  interviewee,
  onDrop,
  onRemoveCandidate,
}: {
  interviewee: Interviewee
  onDrop: (candidateId: string, intervieweeId: string) => void
  onRemoveCandidate: (candidateId: string, intervieweeId: string) => void
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "candidate",
    drop: (item: { id: string }) => {
      onDrop(item.id, interviewee.id)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <div className="w-full md:w-64 flex-shrink-0">
      <div className="bg-white rounded-lg shadow-sm border p-4 h-full">
        <div className="flex items-center gap-2 mb-4">
          <Avatar>
            <AvatarImage src={interviewee.avatar || "/placeholder.svg"} alt={interviewee.name} />
            <AvatarFallback>{interviewee.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{interviewee.name}</h2>
            <p className="text-xs text-muted-foreground">{interviewee.position}</p>
          </div>
        </div>

        <div
          ref={drop}
          className={`min-h-[2000px] rounded-md p-2 ${isOver ? "bg-green-50 border-2 border-dashed border-green-200" : "bg-slate-50"}`}
        >
          {interviewee.candidates.length === 0 ? (
            <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
              Drop candidates here
            </div>
          ) : (
            <div>
              {interviewee.candidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  isAssigned={true}
                  onRemove={() => onRemoveCandidate(candidate.id, interviewee.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function InterviewScheduler() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates)
  const [interviewees, setInterviewees] = useState<Interviewee[]>(initialInterviewees)

  const handleDrop = (candidateId: string, intervieweeId: string) => {
  setInterviewees((prevInterviewees) => {
    // Find the candidate from pool or interviewees
    const candidate =
      candidates.find((c) => c.id === candidateId) ||
      prevInterviewees.flatMap((i) => i.candidates).find((c) => c.id === candidateId);

    if (!candidate) return prevInterviewees;

    const updatedInterviewees = prevInterviewees.map((interviewee) => {
      // Remove the candidate from all interviewees
      const filteredCandidates = interviewee.candidates.filter((c) => c.id !== candidateId);

      // If this is the drop target, add candidate to it
      if (interviewee.id === intervieweeId) {
        return {
          ...interviewee,
          candidates: [...filteredCandidates, candidate],
        };
      }

      return {
        ...interviewee,
        candidates: filteredCandidates,
      };
    });

    return updatedInterviewees;
  });

  // Remove candidate from pool if they were in it
  setCandidates((prev) => prev.filter((c) => c.id !== candidateId));
};


  const handleRemoveCandidate = (candidateId: string, intervieweeId: string) => {
    // Find the candidate in the interviewee's list
    const interviewee = interviewees.find((i) => i.id === intervieweeId)
    if (!interviewee) return

    const candidate = interviewee.candidates.find((c) => c.id === candidateId)
    if (!candidate) return

    // Remove candidate from interviewee
    const updatedInterviewees = interviewees.map((i) => {
      if (i.id === intervieweeId) {
        return {
          ...i,
          candidates: i.candidates.filter((c) => c.id !== candidateId),
        }
      }
      return i
    })

    // Add candidate back to unassigned pool
    setCandidates([...candidates, candidate])
    setInterviewees(updatedInterviewees)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-[calc(100vh-3rem)] overflow-hidden flex flex-col">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-6">Interview Assignment Board</h1>

          {/* Candidates Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Available Candidates</h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {candidates.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))}
              {candidates.length === 0 && (
                <div className="col-span-full p-4 text-center text-muted-foreground">
                  All candidates have been assigned
                </div>
              )}
            </div>
          </div>

          {/* Interviewee Columns */}
          <div className="mb-3 flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Interviewers</h2>
          </div>
        </div>

        <ScrollArea className="flex-1 px-4">
          <div className="flex gap-4 pb-4 min-h-[300px]">
            {interviewees.map((interviewee) => (
              <IntervieweeColumn
                key={interviewee.id}
                interviewee={interviewee}
                onDrop={handleDrop}
                onRemoveCandidate={handleRemoveCandidate}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </DndProvider>
  )
}
