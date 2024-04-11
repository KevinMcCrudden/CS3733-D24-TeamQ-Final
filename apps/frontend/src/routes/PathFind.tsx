import { useCallback, useState } from "react";
import { trpc } from "../utils/trpc.ts";
import { skipToken } from "@tanstack/react-query";
import Map from "../components/Map.tsx";
import { Settings2 } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { ArrowLeft } from "lucide-react";
import { EndNodeAutocomlete } from "@/components/EndNodeAutocomlete.tsx";
import FloorSelection from "@/components/FloorSelection.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PathfindSettings from "@/components/PathfindSettings.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "wouter";

type Floor = "L1" | "L2" | "1" | "2" | "3";
const FLOOR_URLS: Record<Floor, string> = {
  L2: "/00_thelowerlevel2.png",
  L1: "/00_thelowerlevel1.png",
  "1": "/01_thefirstfloor.png",
  "2": "/02_thesecondfloor.png",
  "3": "/03_thethirdfloor.png",
};

export default function PathFind() {
  const [startNode, setStartNode] = useState("BINFO00202");
  const [goalNode, setGoalNode] = useState("");
  const [imgUrl, setImgUrl] = useState("/02_thesecondfloor.png");
  const [floor, setFloor] = useState("2");
  const [algorithm, setAlgorithm] = useState("A*");
  const { isAuthenticated } = useAuth0();
  const nodesQuery = trpc.db.getAllNodes.useQuery();

  if (nodesQuery.isError) {
    console.log("Error in nodesQuery");
  }
  if (nodesQuery.isLoading) {
    console.log("Nodes are loading");
  }

  const pathQuery = trpc.pathfinder.findPath;
  const path = pathQuery.useQuery(
    startNode && goalNode
      ? { startNodeId: startNode, endNodeId: goalNode, algorithm: algorithm }
      : skipToken,
  );
  const pathData = path.data;

  const handleNodeClickInApp = (clickedNode: string) => {
    // if (startNode && goalNode) {
    //   setStartNode(clickedNode);
    //   setGoalNode("");
    // } else if (!startNode) {
    //   setStartNode(clickedNode);
    // } else if (!goalNode) {
    setGoalNode(clickedNode);
    // }
  };

  const handleFloorClick = useCallback(
    (clickedFloor: string, clickedForURL: string) => {
      setImgUrl(clickedForURL);
      setFloor(clickedFloor);
    },
    [setImgUrl, setFloor],
  );

  const handleStartNode = useCallback(
    (startNode: string) => {
      setStartNode(startNode);
      const nodesData = nodesQuery?.data;
      if (nodesData) {
        const startNodeFloor = nodesData.find(
          (node) => node.nodeId === startNode,
        )?.floor;
        if (startNodeFloor) {
          setFloor(startNodeFloor);
          setImgUrl(FLOOR_URLS[startNodeFloor as Floor]);
        }
      }
    },
    [setStartNode, setFloor, setImgUrl, nodesQuery],
  );

  return (
    <div className="relative h-full">
      <Map
        onNodeClick={handleNodeClickInApp}
        nodes={nodesQuery.data}
        path={pathData}
        startNode={startNode}
        goalNode={goalNode}
        imgURL={imgUrl}
        floor={floor}
      />

      {!isAuthenticated && (
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <Button
            asChild
            size="icon"
            className="backdrop-blur-[4px] bg-white/90 shadow-inner drop-shadow-md"
            variant="ghost"
          >
            <Link to="/">
              <ArrowLeft color="#000000" />
            </Link>
          </Button>
        </div>
      )}

      <div className="absolute backdrop-blur-[4px] bg-white/90 top-12 left-1/2 transform -translate-x-1/2 rounded-[100px] shadow-inner drop-shadow-md">
        <EndNodeAutocomlete
          Rooms={nodesQuery.data}
          onChange={(e) => setGoalNode(e)}
          selectedNode={goalNode}
        />
      </div>

      <div className="absolute flex gap-5 bottom-6 left-1/2 transform -translate-x-1/2">
        {isAuthenticated && (
          <div className="flex backdrop-blur-[4px] bg-white/80 gap-5 px-[30px] py-[23px] rounded-[100px] shadow-inner drop-shadow-md">
            <Popover>
              <PopoverTrigger asChild>
                <Settings2 className="cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent className="w-80" sideOffset={32}>
                <PathfindSettings
                  onAlgorithmSelect={setAlgorithm}
                  algorithm={algorithm}
                  Rooms={nodesQuery.data}
                  onStartNodeSelect={(e) => handleStartNode(e)}
                  startNode={startNode}
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
      <div className="absolute flex items-center gap-[35px] text-xl font-bold bottom-12 right-32">
        <div className="flex flex-col gap-[15px]">
          <h2>3</h2>
          <h2>2</h2>
          <h2>1</h2>
          <h2>L1</h2>
          <h2>L2</h2>
        </div>
        <FloorSelection onFloorClick={handleFloorClick} />
      </div>
    </div>
  );
}
