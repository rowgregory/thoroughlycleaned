export type ServiceType = "Commercial" | "Residential" | "Biohazard";

export interface ServiceCardProps {
  url: string;
  name: string;
  description: string;
  serviceType: ServiceType;
}
