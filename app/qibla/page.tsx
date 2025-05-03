"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Compass, MapPin, RotateCcw, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function QiblaPage() {
  const [direction, setDirection] = useState<number | null>(null)
  const [heading, setHeading] = useState<number | null>(null)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isCalibrating, setIsCalibrating] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { toast } = useToast()

  // Calculate Qibla direction
  const calculateQibla = (lat: number, lng: number) => {
    // Coordinates of the Kaaba
    const kaabaLat = 21.4225
    const kaabaLng = 39.8262

    // Convert to radians
    const latRad = (lat * Math.PI) / 180
    const lngRad = (lng * Math.PI) / 180
    const kaabaLatRad = (kaabaLat * Math.PI) / 180
    const kaabaLngRad = (kaabaLng * Math.PI) / 180

    // Calculate the direction
    const y = Math.sin(kaabaLngRad - lngRad)
    const x = Math.cos(latRad) * Math.tan(kaabaLatRad) - Math.sin(latRad) * Math.cos(kaabaLngRad - lngRad)
    let qiblaDirection = Math.atan2(y, x) * (180 / Math.PI)

    // Normalize to 0-360
    qiblaDirection = (qiblaDirection + 360) % 360

    return qiblaDirection
  }

  const getLocation = () => {
    setIsCalibrating(true)
    setErrorMessage(null)

    if (!navigator.geolocation) {
      setErrorMessage("La géolocalisation n'est pas prise en charge par votre navigateur.")
      setIsCalibrating(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({ lat: latitude, lng: longitude })
        const qiblaDir = calculateQibla(latitude, longitude)
        setDirection(qiblaDir)
        setIsCalibrating(false)

        toast({
          title: "Localisation trouvée",
          description: "La direction de la Qibla a été calculée avec succès.",
        })
      },
      (error) => {
        setErrorMessage("Impossible d'obtenir votre position. Veuillez autoriser l'accès à la localisation.")
        setIsCalibrating(false)
        console.error("Geolocation error:", error)
      },
    )
  }

  const startCompass = () => {
    if (!window.DeviceOrientationEvent) {
      setErrorMessage("Votre appareil ne prend pas en charge la boussole.")
      return
    }

    // Request permission for iOS 13+ devices
    if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      ;(DeviceOrientationEvent as any)
        .requestPermission()
        .then((permissionState: string) => {
          if (permissionState === "granted") {
            window.addEventListener("deviceorientation", handleOrientation)
          } else {
            setErrorMessage("Permission refusée pour accéder à la boussole.")
          }
        })
        .catch(() => {
          setErrorMessage("Impossible d'accéder à la boussole.")
        })
    } else {
      window.addEventListener("deviceorientation", handleOrientation)
    }
  }

  const handleOrientation = (event: DeviceOrientationEvent) => {
    // Get the device heading (alpha is the compass direction)
    let alpha = event.alpha
    if (alpha !== null) {
      // Normalize to 0-360
      alpha = (alpha + 360) % 360
      setHeading(alpha)
    }
  }

  useEffect(() => {
    getLocation()
    startCompass()

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation)
    }
  }, [])

  const recalibrate = () => {
    getLocation()
    toast({
      title: "Recalibration",
      description: "La boussole est en cours de recalibration...",
    })
  }

  // Calculate the angle to rotate the compass needle
  const compassRotation = heading !== null ? `rotate(${-heading}deg)` : "rotate(0deg)"

  // Calculate the angle to rotate the Qibla indicator
  const qiblaRotation =
    heading !== null && direction !== null
      ? `rotate(${direction - heading}deg)`
      : direction !== null
        ? `rotate(${direction}deg)`
        : "rotate(0deg)"

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Trouvez la Direction de la Qibla</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Compass className="mr-2 h-5 w-5" />
                Boussole de la Qibla
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                {errorMessage && (
                  <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 max-w-md">{errorMessage}</div>
                )}

                <div className="relative w-64 h-64 mb-8">
                  {/* Compass background */}
                  <div
                    className="absolute inset-0 rounded-full border-4 border-gray-200 flex items-center justify-center"
                    style={{ transform: compassRotation }}
                  >
                    {/* Cardinal directions */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 font-bold text-gray-700">N</div>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 font-bold text-gray-700">
                      S
                    </div>
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 font-bold text-gray-700">W</div>
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 font-bold text-gray-700">E</div>

                    {/* Compass markings */}
                    {Array.from({ length: 72 }).map((_, i) => (
                      <div
                        key={i}
                        className={`absolute h-full w-0.5 ${i % 9 === 0 ? "bg-gray-400" : "bg-gray-200"}`}
                        style={{ transform: `rotate(${i * 5}deg)` }}
                      >
                        <div className={`h-2 w-0.5 bg-inherit`}></div>
                      </div>
                    ))}

                    {/* Compass needle */}
                    <div className="relative h-full w-full">
                      <div className="absolute top-0 left-1/2 h-1/2 w-1 bg-red-500 -ml-0.5 rounded-t-full"></div>
                      <div className="absolute bottom-0 left-1/2 h-1/2 w-1 bg-gray-700 -ml-0.5 rounded-b-full"></div>
                    </div>
                  </div>

                  {/* Qibla indicator */}
                  {direction !== null && (
                    <div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      style={{ transform: qiblaRotation }}
                    >
                      <div className="w-full h-1 flex items-center justify-end">
                        <div className="h-6 w-6 rounded-full bg-[#0F4C75] flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Center point */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="h-3 w-3 rounded-full bg-gray-800"></div>
                  </div>
                </div>

                {location && (
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>
                        {location.lat.toFixed(4)}°, {location.lng.toFixed(4)}°
                      </span>
                    </div>
                    {direction !== null && (
                      <div className="font-medium text-[#0F4C75]">Direction de la Qibla: {direction.toFixed(1)}°</div>
                    )}
                  </div>
                )}

                <Button
                  onClick={recalibrate}
                  className="bg-[#0F4C75] hover:bg-[#1B262C] flex items-center"
                  disabled={isCalibrating}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  {isCalibrating ? "Calibration..." : "Recalibrer"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="mr-2 h-5 w-5" />À propos de la Qibla
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <p>
                  La Qibla est la direction que les musulmans doivent faire face lors de la prière. Elle pointe vers la
                  Kaaba, située dans la ville sainte de La Mecque en Arabie Saoudite.
                </p>
                <p>
                  Allah dit dans le Coran: "D'où que tu viennes, tourne ton visage vers la Mosquée sacrée. Où que vous
                  soyez, tournez vos visages vers elle." (Sourate Al-Baqarah, 2:150)
                </p>
                <p>Pour utiliser cette boussole:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Assurez-vous que votre appareil est à plat</li>
                  <li>Autorisez l'accès à votre position et à la boussole</li>
                  <li>L'indicateur bleu pointe vers la Kaaba</li>
                  <li>Recalibrez si nécessaire</li>
                </ul>
                <p className="italic text-gray-500">
                  Note: La précision peut varier selon votre appareil et les conditions environnementales.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Mosquées à proximité</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-[#0F4C75] hover:bg-[#1B262C] mb-4">Trouver des mosquées à proximité</Button>
              <div className="text-center text-sm text-gray-500">
                Découvrez les mosquées proches de votre position actuelle pour prier en congrégation.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
