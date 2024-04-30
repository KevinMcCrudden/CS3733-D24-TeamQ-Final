import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { navigate } from "wouter/use-browser-location";
import { Button } from "@/components/ui/button.tsx";

export default function HomeGuidePage() {
  const goPatient = () => {
    navigate("/help/patientguide", { replace: true });
  };

  const goStaff = () => {
    navigate("/help/staffguide", { replace: true });
  };

  const goAdmin = () => {
    navigate("/help/adminguide", { replace: true });
  };

  return (
    <>
      <Accordion type="single" collapsible className="w-auto col-span-3 mx-10">
        <AccordionItem value="Intro">
          <AccordionTrigger className="text-black">
            Introduction: The Basics
          </AccordionTrigger>
          <AccordionContent>
            <p>
              &emsp;&emsp;Contained within this user manual is the description
              of every feature, where they lie within the website itself, how to
              access them, and their practical applications for patients, staff,
              and administration members. Captures of each step on the website
              are displayed as well to help clarify each step to navigating and
              operating features. The Features across the website require
              different degrees of access, with the most basic form of access
              being patient. The middle ground would be staff level access and
              then the highest being Admin, being able to use all features
              contained within the website. This also means that the higher
              levels of access inherit all of the actions that the level of
              access that previous level has.
            </p>
            <br />
            <p>
              &emsp;&emsp;With our current structure to security on our website,
              we have some basic features that are constant across the different
              levels of access that are described below.
            </p>
            <Accordion type="single" collapsible className="w-auto mx-10">
              <AccordionItem value="Pathfinding">
                <AccordionTrigger className="text-black">
                  Pathfinding
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    &emsp;&emsp;Pathfinding can be accessed by pressing the Get
                    Directions button on the left on the Home Screen. Here they
                    can see the map of the entire hospital.
                  </p>
                  <div className="w-full flex justify-center">
                    <img
                      src="./helpmenucaptures/Pathfind0.PNG"
                      alt="homescreen"
                      className="object-scale-down w-[50%] h-auto rounded-md m-2"
                    />
                  </div>
                  <br />
                  <p>
                    &emsp;&emsp;Users can drag around the screen to pan the map,
                    or scroll their mouse to zoom in or out. If users want to
                    return to the Home Page, they can press the arrow on the top
                    right corner of the screen.
                  </p>
                  <div className="w-full flex justify-center">
                    <img
                      src="./helpmenucaptures/Pathfind0.PNG"
                      alt="homescreen"
                      className="object-scale-down w-[50%] h-auto rounded-md m-2"
                    />
                  </div>
                  <p>
                    &emsp;&emsp;Users can use the floor selector on the right to
                    switch the map between floors by tapping on the floor they
                    want. Each floor of the hospital is listed and labeled
                    accordingly, and after selecting the floor, it will be
                    highlighted reminding Users what floor they are currently
                    on.
                  </p>
                  <div className="w-full flex justify-center">
                    <img
                      src="./helpmenucaptures/Pathfind0.PNG"
                      alt="homescreen"
                      className="object-scale-down w-[50%] h-auto rounded-md m-2"
                    />
                  </div>
                  <p>
                    &emsp;&emsp;To add additional context to the symbols used on
                    the map, hovering over the key button will pull up the Map
                    Key, listing all pertinent symbols to navigate the hospital.
                  </p>
                  <div className="w-full flex justify-center">
                    <img
                      src="./helpmenucaptures/Pathfind0.PNG"
                      alt="homescreen"
                      className="object-scale-down w-[50%] h-auto rounded-md m-2"
                    />
                  </div>
                  <p>
                    &emsp;&emsp;Pressing the button with two lines and circles
                    adjacent to it will allow the user to change additional
                    settings. They can set their path to prioritize ease of
                    mobility, helping those in wheelchairs and other mobility
                    impairments, they can select the algorithm for their
                    preferred style of navigation (the algorithms include A*,
                    Dijkstra, Breadth first search, and depth first search with
                    A* being the default) , and they can select their default
                    start location.
                  </p>
                  <div className="w-full flex justify-center">
                    <img
                      src="./helpmenucaptures/Pathfind0.PNG"
                      alt="homescreen"
                      className="object-scale-down w-[50%] h-auto rounded-md m-2"
                    />
                  </div>
                  <p>
                    &emsp;&emsp;Users can select the search bars on the top of
                    the screen to input a starting location and destination.
                    They can peruse the dropdown for their required destination,
                    or they can search for a location directly, which will
                    filter out irrelevant locations.
                  </p>
                  <div className="w-full flex justify-center">
                    <img
                      src="./helpmenucaptures/Pathfind0.PNG"
                      alt="homescreen"
                      className="object-scale-down w-[50%] h-auto rounded-md m-2"
                    />
                  </div>
                  <p>
                    &emsp;&emsp;Users can also alternatively click nodes on the
                    map to set locations. Once two nodes have been set, or both
                    search bars have been filled, directions will be displayed
                    with an animated line traveling toward the final
                    destination. Additionally, text directions will appear
                    giving clear and concise directions. These directions can
                    also be heard, by clicking the play button users can be read
                    allowed directions through text to speech. These text
                    directions can also be taken along with users by scanning
                    the QR code displayed at the bottom of the screen with their
                    phone, which will bring the users to a phone friendly
                    website with the text directions displayed.
                  </p>
                  <div className="w-full flex justify-center">
                    <img
                      src="./helpmenucaptures/Pathfind0.PNG"
                      alt="homescreen"
                      className="object-scale-down w-[50%] h-auto rounded-md m-2"
                    />
                  </div>
                  <p>
                    While any user can access pathfinding without logging in,
                    logged in users are also able to access the page. Logged in
                    users will automatically be directed to the same page, but
                    will gain the additional feature of a navigation bar which
                    grants them access to features that are otherwise
                    restricted.
                  </p>
                  <div className="w-full flex justify-center">
                    <img
                      src="./helpmenucaptures/Pathfind0.PNG"
                      alt="homescreen"
                      className="object-scale-down w-[50%] h-auto rounded-md m-2"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button variant="ghost" onClick={goPatient} className="h-auto w-full">
        <Card className="w-full h-fit shadow-md">
          <CardHeader>
            <CardTitle>Patient</CardTitle>
          </CardHeader>
          <CardContent className="text-left">
            <CardDescription>
              Patients Features:
              <ul className="ps-5 list-disc">
                <li>Appointment Check in</li>
                <li>Appointment Management</li>
                <li>Appointment Scheduling</li>
              </ul>
            </CardDescription>
          </CardContent>
        </Card>
      </Button>

      <Button variant="ghost" onClick={goStaff} className="h-auto w-full">
        <Card className="w-full h-fit shadow-md">
          <CardHeader>
            <CardTitle>Staff</CardTitle>
          </CardHeader>
          <CardContent className="text-left">
            <CardDescription>
              Staff Features:
              <ul className="ps-5 list-disc">
                <li>Create Service Requests</li>
                <li>Patient Management</li>
                <li>Create Patients and Staff</li>
              </ul>
            </CardDescription>
          </CardContent>
        </Card>
      </Button>

      <Button variant="ghost" onClick={goAdmin} className="h-auto w-full">
        <Card className="w-full h-fit shadow-md">
          <CardHeader>
            <CardTitle>Admin</CardTitle>
          </CardHeader>
          <CardContent className="text-left">
            <CardDescription>
              Admin Features:
              <ul className="ps-5 list-disc">
                <li>Map Editing</li>
                <li>Database Management</li>
                <li>Create Users</li>
              </ul>
            </CardDescription>
          </CardContent>
        </Card>
      </Button>
    </>
  );
}