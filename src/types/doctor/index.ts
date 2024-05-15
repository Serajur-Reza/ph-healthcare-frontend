export interface TDoctor {
  id: string;
  name: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number | undefined;
  gender: "MALE" | "FEMALE";
  appointmentFee: number | undefined;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  specialities?: TSpecialities[];
}

export interface TSpecialities {
  specialitiesId: string;
  isDeleted?: null;
}

export interface TDoctorFormData {
  doctor: TDoctor;
  password: string;
}
