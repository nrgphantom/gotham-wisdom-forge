import React from 'react';
import Navigation from '../components/Navigation';
const Donate = () => {
  const reliefOrganizations = {
    gaza: [{
      name: "UNRWA",
      url: "https://donate.unrwa.org/int/en/gaza"
    }, {
      name: "Palestine Children's Relief Fund (PCRF)",
      url: "https://www.pcrf.net/"
    }, {
      name: "Islamic Relief USA",
      url: "https://irusa.org/middle-east/palestine/"
    }, {
      name: "Anera",
      url: "https://www.anera.org/where-we-work/palestine/gaza/"
    }, {
      name: "Save the Children",
      url: "https://www.savethechildren.org/us/where-we-work/west-bank-gaza"
    }, {
      name: "Gaza Soup Kitchen",
      url: "https://gazasoupkitchen.com/"
    }, {
      name: "Dahnoun Mutual Aid",
      url: "https://chuffed.org/project/115245-dahnoun-mutual-aid"
    }, {
      name: "HEAL Palestine",
      url: "https://www.healpalestine.org/donate/"
    }, {
      name: "MedGlobal",
      url: "https://medglobal.org/campaign/gaza-rmm/donate/"
    }],
    ukraine: [{
      name: "United24",
      url: "https://u24.gov.ua/"
    }, {
      name: "Razom for Ukraine",
      url: "https://razomforukraine.org/donate/"
    }, {
      name: "Nova Ukraine",
      url: "https://novaukraine.org/donate/"
    }, {
      name: "Doctors Without Borders (MSF) Ukraine",
      url: "https://donate.doctorswithoutborders.org/donate/msf-ukraine"
    }, {
      name: "International Committee of the Red Cross (ICRC) Ukraine",
      url: "https://www.icrc.org/en/where-we-work/europe-central-asia/ukraine"
    }],
    sudan: [{
      name: "Sudan Relief Fund",
      url: "https://sudanrelieffund.com/donate/"
    }, {
      name: "Doctors Without Borders (MSF) Sudan",
      url: "https://donate.doctorswithoutborders.org/donate/msf-sudan"
    }, {
      name: "International Rescue Committee (IRC) Sudan",
      url: "https://www.rescue.org/country/sudan"
    }, {
      name: "CARE International Sudan",
      url: "https://www.care.org/where-we-work/sudan/"
    }],
    international: [{
      name: "International Committee of the Red Cross (ICRC)",
      url: "https://www.icrc.org/en/donate"
    }, {
      name: "Doctors Without Borders (MSF)",
      url: "https://donate.doctorswithoutborders.org/"
    }, {
      name: "Direct Relief",
      url: "https://www.directrelief.org/"
    }, {
      name: "CARE International",
      url: "https://www.care.org/donate/"
    }, {
      name: "Oxfam International",
      url: "https://www.oxfam.org/en/donate"
    }, {
      name: "World Food Programme (WFP)",
      url: "https://www.wfp.org/donate"
    }],
    crowdfunding: [{
      name: "GoFundMe",
      url: "https://www.gofundme.com/c/cause/gaza-crisis-relief"
    }, {
      name: "JustGiving",
      url: "https://www.justgiving.com/"
    }, {
      name: "GlobalGiving",
      url: "https://www.globalgiving.org/projects/"
    }]
  };
  const handleDonationClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  return <div className="min-h-screen bg-gotham-black">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-batman font-black text-4xl md:text-6xl text-bat-yellow mb-4">
              DONATION CENTER
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              "Justice isn't just about fighting crime. It's about helping those in need."
            </p>
          </div>

          {/* Gaza Relief Organizations */}
          <div className="mb-12">
            <h2 className="font-batman font-bold text-2xl text-bat-yellow mb-6 flex items-center">
              
              GAZA RELIEF ORGANIZATIONS
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reliefOrganizations.gaza.map((org, index) => <button key={index} onClick={() => handleDonationClick(org.url)} className="gotham-card p-4 rounded-lg text-left hover:transform hover:scale-105 transition-all duration-300 hover:bg-green-500/10 border-l-4 border-green-500">
                  <h3 className="font-batman font-bold text-white text-sm mb-1">
                    {org.name}
                  </h3>
                  <p className="text-gray-400 text-xs">Click to donate</p>
                </button>)}
            </div>
          </div>

          {/* Ukraine Relief Organizations */}
          <div className="mb-12">
            <h2 className="font-batman font-bold text-2xl text-bat-yellow mb-6 flex items-center">
              
              UKRAINE RELIEF ORGANIZATIONS
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reliefOrganizations.ukraine.map((org, index) => <button key={index} onClick={() => handleDonationClick(org.url)} className="gotham-card p-4 rounded-lg text-left hover:transform hover:scale-105 transition-all duration-300 hover:bg-blue-500/10 border-l-4 border-blue-500">
                  <h3 className="font-batman font-bold text-white text-sm mb-1">
                    {org.name}
                  </h3>
                  <p className="text-gray-400 text-xs">Click to donate</p>
                </button>)}
            </div>
          </div>

          {/* Sudan Relief Organizations */}
          <div className="mb-12">
            <h2 className="font-batman font-bold text-2xl text-bat-yellow mb-6 flex items-center">
              
              SUDAN RELIEF ORGANIZATIONS
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reliefOrganizations.sudan.map((org, index) => <button key={index} onClick={() => handleDonationClick(org.url)} className="gotham-card p-4 rounded-lg text-left hover:transform hover:scale-105 transition-all duration-300 hover:bg-red-500/10 border-l-4 border-red-500">
                  <h3 className="font-batman font-bold text-white text-sm mb-1">
                    {org.name}
                  </h3>
                  <p className="text-gray-400 text-xs">Click to donate</p>
                </button>)}
            </div>
          </div>

          {/* Major International Aid Organizations */}
          <div className="mb-12">
            <h2 className="font-batman font-bold text-2xl text-bat-yellow mb-6 flex items-center">
              
              MAJOR INTERNATIONAL AID ORGANIZATIONS
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reliefOrganizations.international.map((org, index) => <button key={index} onClick={() => handleDonationClick(org.url)} className="gotham-card p-4 rounded-lg text-left hover:transform hover:scale-105 transition-all duration-300 hover:bg-bat-yellow/10 border-l-4 border-bat-yellow">
                  <h3 className="font-batman font-bold text-white text-sm mb-1">
                    {org.name}
                  </h3>
                  <p className="text-gray-400 text-xs">Click to donate</p>
                </button>)}
            </div>
          </div>

          {/* Crowdfunding Platforms */}
          <div>
            <h2 className="font-batman font-bold text-2xl text-bat-yellow mb-6 flex items-center">
              
              CROWDFUNDING PLATFORMS
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reliefOrganizations.crowdfunding.map((org, index) => <button key={index} onClick={() => handleDonationClick(org.url)} className="gotham-card p-4 rounded-lg text-left hover:transform hover:scale-105 transition-all duration-300 hover:bg-purple-500/10 border-l-4 border-purple-500">
                  <h3 className="font-batman font-bold text-white text-sm mb-1">
                    {org.name}
                  </h3>
                  <p className="text-gray-400 text-xs">Click to donate</p>
                </button>)}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Donate;