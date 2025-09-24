export type SingleTip = {
	imageAlt: string;
	imageUrl: string;
	lastUpdated: string;
	mainBody: Array<{
		Content: string;
		Description: string;
		Title: string;
	}>;
	mainTitle: string;
};

export type TipsResponse = { data: Array<{ id: string; imageUrl: string; title: string }> };

export type Disease = {
	Description: string;
	Disease: string;
	Image: string;
};

export type DiseasesResponse = {
	data: { diseases: Disease[]; limit: number; page: number; totalDiseases: number };
};

export type SingleDisease = {
	data: {
		Description: string;
		Disease: string;
		Image: string;
		Precautions: string[];
		Symptoms: string[];
	};
};

type Doctor = {
	_id: string;
	appointments: unknown[]; // You can define a more specific type if you know the structure of appointments
	country: string;
	email: string;
	firstName: string;
	gender: string;
	haveAppointment: boolean;
	lastName: string;
	medicalCert: string;
	picture: string;
	role: string;
	specialty: string;
};

export type MatchDoctorsResponse = {
	selectedDoctors: Doctor[];
};
