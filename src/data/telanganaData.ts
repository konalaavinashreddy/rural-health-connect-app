export const telanganaDistricts = [
  'Hyderabad', 'Secunderabad', 'Warangal', 'Nizamabad', 'Khammam', 
  'Karimnagar', 'Mahbubnagar', 'Nalgonda', 'Adilabad', 'Medak',
  'Rangareddy', 'Sangareddy', 'Vikarabad', 'Kamareddy', 'Siddipet',
  'Jagitial', 'Rajanna Sircilla', 'Peddapalli', 'Jayashankar Bhupalpally',
  'Mulugu', 'Bhadradri Kothagudem', 'Mahabubabad', 'Suryapet',
  'Yadadri Bhuvanagiri', 'Wanaparthy', 'Narayanpet', 'Jogulamba Gadwal',
  'Nagarkurnool', 'Asifabad', 'Mancherial', 'Nirmal', 'Jagtial'
];

export const telanganaHospitals = [
  {
    id: 1,
    name: 'NIMS - Nizam\'s Institute of Medical Sciences',
    address: 'Punjagutta, Hyderabad, Telangana 500082',
    district: 'Hyderabad',
    distance: '2.5 km',
    rating: 4.8,
    specialties: ['Cardiology', 'Neurology', 'Emergency', 'Oncology', 'Nephrology'],
    hours: '24/7',
    phone: '+91 40 2348 8001',
    position: { top: '25%', left: '45%' },
    type: 'Government',
    latitude: 17.4239,
    longitude: 78.4738
  },
  {
    id: 2,
    name: 'Apollo Hospitals',
    address: 'Jubilee Hills, Hyderabad, Telangana 500033',
    district: 'Hyderabad',
    distance: '3.2 km',
    rating: 4.9,
    specialties: ['Cardiology', 'Orthopedics', 'Gastroenterology', 'Neurosurgery'],
    hours: '24/7',
    phone: '+91 40 2360 7777',
    position: { top: '35%', left: '50%' },
    type: 'Private',
    latitude: 17.4316,
    longitude: 78.3994
  },
  {
    id: 3,
    name: 'Gandhi Hospital',
    address: 'Musheerabad, Secunderabad, Telangana 500003',
    district: 'Secunderabad',
    distance: '4.1 km',
    rating: 4.5,
    specialties: ['General Medicine', 'Emergency', 'Pediatrics', 'Gynecology'],
    hours: '24/7',
    phone: '+91 40 2770 1146',
    position: { top: '20%', left: '55%' },
    type: 'Government',
    latitude: 17.4507,
    longitude: 78.4988
  },
  {
    id: 4,
    name: 'Osmania General Hospital',
    address: 'Afzal Gunj, Hyderabad, Telangana 500012',
    district: 'Hyderabad',
    distance: '1.8 km',
    rating: 4.4,
    specialties: ['General Medicine', 'Surgery', 'Emergency', 'Trauma Care'],
    hours: '24/7',
    phone: '+91 40 2460 7070',
    position: { top: '40%', left: '40%' },
    type: 'Government',
    latitude: 17.3616,
    longitude: 78.4747
  },
  {
    id: 5,
    name: 'Kakatiya Medical College Hospital',
    address: 'Warangal, Telangana 506007',
    district: 'Warangal',
    distance: '145 km',
    rating: 4.3,
    specialties: ['General Medicine', 'Pediatrics', 'Gynecology', 'Surgery'],
    hours: '24/7',
    phone: '+91 870 257 8425',
    position: { top: '60%', left: '70%' },
    type: 'Government',
    latitude: 17.9689,
    longitude: 79.5941
  },
  {
    id: 6,
    name: 'Nizamabad Government Hospital',
    address: 'Nizamabad, Telangana 503001',
    district: 'Nizamabad',
    distance: '175 km',
    rating: 4.2,
    specialties: ['General Medicine', 'Emergency', 'Maternity', 'Pediatrics'],
    hours: '24/7',
    phone: '+91 846 225 2344',
    position: { top: '15%', left: '35%' },
    type: 'Government',
    latitude: 18.6725,
    longitude: 78.0941
  }
];

export const telanganaDoctors = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar Reddy',
    specialty: 'Cardiologist',
    hospital: 'NIMS - Nizam\'s Institute of Medical Sciences',
    district: 'Hyderabad',
    rating: 4.9,
    experience: 18,
    successRate: 96,
    nextAvailable: 'Today, 3:00 PM',
    avatar: 'RR',
    languages: ['Telugu', 'English', 'Hindi'],
    qualification: 'DM Cardiology, AIIMS',
    consultationFee: 800
  },
  {
    id: 2,
    name: 'Dr. Priya Sharma',
    specialty: 'Pediatrician',
    hospital: 'Apollo Hospitals',
    district: 'Hyderabad',
    rating: 4.8,
    experience: 12,
    successRate: 98,
    nextAvailable: 'Tomorrow, 10:00 AM',
    avatar: 'PS',
    languages: ['Telugu', 'English'],
    qualification: 'MD Pediatrics',
    consultationFee: 600
  },
  {
    id: 3,
    name: 'Dr. Venkatesh Naidu',
    specialty: 'General Physician',
    hospital: 'Gandhi Hospital',
    district: 'Secunderabad',
    rating: 4.7,
    experience: 15,
    successRate: 94,
    nextAvailable: 'Today, 11:30 AM',
    avatar: 'VN',
    languages: ['Telugu', 'English', 'Urdu'],
    qualification: 'MBBS, MD General Medicine',
    consultationFee: 300
  },
  {
    id: 4,
    name: 'Dr. Lakshmi Devi',
    specialty: 'Gynecologist',
    hospital: 'Osmania General Hospital',
    district: 'Hyderabad',
    rating: 4.6,
    experience: 20,
    successRate: 95,
    nextAvailable: 'Tomorrow, 2:00 PM',
    avatar: 'LD',
    languages: ['Telugu', 'English'],
    qualification: 'MS Gynecology',
    consultationFee: 400
  },
  {
    id: 5,
    name: 'Dr. Srinivas Rao',
    specialty: 'Orthopedic',
    hospital: 'Apollo Hospitals',
    district: 'Hyderabad',
    rating: 4.8,
    experience: 16,
    successRate: 97,
    nextAvailable: 'Today, 4:30 PM',
    avatar: 'SR',
    languages: ['Telugu', 'English'],
    qualification: 'MS Orthopedics',
    consultationFee: 700
  },
  {
    id: 6,
    name: 'Dr. Ramesh Chandra',
    specialty: 'Dermatologist',
    hospital: 'NIMS - Nizam\'s Institute of Medical Sciences',
    district: 'Hyderabad',
    rating: 4.5,
    experience: 10,
    successRate: 93,
    nextAvailable: 'Tomorrow, 9:00 AM',
    avatar: 'RC',
    languages: ['Telugu', 'English', 'Hindi'],
    qualification: 'MD Dermatology',
    consultationFee: 500
  }
];

export const telanganaSpecialties = [
  'General Physician', 'Cardiologist', 'Pediatrician', 'Gynecologist', 
  'Orthopedic', 'Dermatologist', 'Neurologist', 'Oncologist', 
  'Gastroenterologist', 'Pulmonologist', 'Endocrinologist', 'Psychiatrist'
];

export const commonDiseases = [
  'Fever', 'Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 
  'Kidney Stones', 'Thyroid', 'Joint Pain', 'Skin Problems', 
  'Stomach Problems', 'Eye Problems', 'Mental Health'
];

export const telanganaMedicines = [
  {
    id: 1,
    name: 'Metformin (మెట్‌ఫార్మిన్)',
    genericName: 'Metformin Hydrochloride',
    dosage: '500mg',
    timing: ['Morning 8:00 AM', 'Evening 8:00 PM'],
    condition: 'Diabetes',
    instructions: 'తిన్న తర్వాత తీసుకోండి (Take after meals)',
    sideEffects: ['Nausea', 'Stomach upset'],
    price: '₹45 per 30 tablets'
  },
  {
    id: 2,
    name: 'Amlodipine (అమ్లోడిపైన్)',
    genericName: 'Amlodipine Besylate',
    dosage: '5mg',
    timing: ['Morning 7:00 AM'],
    condition: 'High Blood Pressure',
    instructions: 'రోజుకు ఒకసారి, ఖాళీ కడుపుతో (Once daily, empty stomach)',
    sideEffects: ['Swelling of feet', 'Dizziness'],
    price: '₹32 per 30 tablets'
  },
  {
    id: 3,
    name: 'Paracetamol (పారాసిటమాల్)',
    genericName: 'Acetaminophen',
    dosage: '650mg',
    timing: ['As needed for fever/pain'],
    condition: 'Fever, Pain',
    instructions: 'జ్వరం లేదా నొప్పి ఉన్నప్పుడు (When fever or pain)',
    sideEffects: ['Rare if taken as directed'],
    price: '₹15 per 10 tablets'
  }
];
