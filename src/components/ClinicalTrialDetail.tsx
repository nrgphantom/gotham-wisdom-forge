
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

interface ClinicalTrial {
  protocolSection: {
    identificationModule: {
      nctId: string;
      briefTitle: string;
      officialTitle?: string;
      organization?: {
        fullName: string;
      };
    };
    statusModule: {
      overallStatus: string;
      startDateStruct?: {
        date: string;
      };
      completionDateStruct?: {
        date: string;
      };
    };
    designModule?: {
      studyType: string;
      phases?: string[];
      designInfo?: {
        allocation?: string;
        interventionModel?: string;
        primaryPurpose?: string;
      };
      enrollmentInfo?: {
        count: number;
      };
    };
    conditionsModule?: {
      conditions: string[];
    };
    descriptionModule?: {
      briefSummary?: string;
      detailedDescription?: string;
    };
    sponsorCollaboratorsModule?: {
      leadSponsor?: {
        name: string;
      };
      collaborators?: Array<{
        name: string;
      }>;
    };
  };
}

interface ClinicalTrialDetailProps {
  trial: ClinicalTrial;
  onBack: () => void;
}

const ClinicalTrialDetail: React.FC<ClinicalTrialDetailProps> = ({ trial, onBack }) => {
  const { protocolSection } = trial;
  
  return (
    <div className="space-y-6">
      <Button 
        onClick={onBack}
        variant="outline"
        className="mb-4 text-bat-yellow border-bat-yellow hover:bg-bat-yellow hover:text-gotham-black"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Research
      </Button>

      <Card className="gotham-card">
        <CardHeader>
          <CardTitle className="text-bat-yellow font-batman text-2xl">
            {protocolSection.identificationModule.briefTitle}
          </CardTitle>
          {protocolSection.identificationModule.officialTitle && (
            <p className="text-gray-300 text-lg">
              {protocolSection.identificationModule.officialTitle}
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-bat-yellow font-batman text-lg mb-3">Study Information</h3>
              <div className="space-y-2 text-gray-300">
                <p><span className="text-bat-yellow">NCT ID:</span> {protocolSection.identificationModule.nctId}</p>
                <p><span className="text-bat-yellow">Status:</span> {protocolSection.statusModule.overallStatus}</p>
                {protocolSection.designModule?.studyType && (
                  <p><span className="text-bat-yellow">Study Type:</span> {protocolSection.designModule.studyType}</p>
                )}
                {protocolSection.designModule?.phases && (
                  <p><span className="text-bat-yellow">Phase:</span> {protocolSection.designModule.phases.join(', ')}</p>
                )}
                {protocolSection.designModule?.enrollmentInfo?.count && (
                  <p><span className="text-bat-yellow">Enrollment:</span> {protocolSection.designModule.enrollmentInfo.count} participants</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-bat-yellow font-batman text-lg mb-3">Timeline</h3>
              <div className="space-y-2 text-gray-300">
                {protocolSection.statusModule.startDateStruct && (
                  <p><span className="text-bat-yellow">Start Date:</span> {protocolSection.statusModule.startDateStruct.date}</p>
                )}
                {protocolSection.statusModule.completionDateStruct && (
                  <p><span className="text-bat-yellow">Completion Date:</span> {protocolSection.statusModule.completionDateStruct.date}</p>
                )}
                {protocolSection.identificationModule.organization && (
                  <p><span className="text-bat-yellow">Organization:</span> {protocolSection.identificationModule.organization.fullName}</p>
                )}
              </div>
            </div>
          </div>

          {protocolSection.conditionsModule?.conditions && (
            <div>
              <h3 className="text-bat-yellow font-batman text-lg mb-3">Conditions</h3>
              <div className="flex flex-wrap gap-2">
                {protocolSection.conditionsModule.conditions.map((condition, index) => (
                  <span key={index} className="bg-gotham-gray px-3 py-1 rounded-full text-sm text-gray-300">
                    {condition}
                  </span>
                ))}
              </div>
            </div>
          )}

          {protocolSection.descriptionModule?.briefSummary && (
            <div>
              <h3 className="text-bat-yellow font-batman text-lg mb-3">Summary</h3>
              <p className="text-gray-300 leading-relaxed">
                {protocolSection.descriptionModule.briefSummary}
              </p>
            </div>
          )}

          {protocolSection.descriptionModule?.detailedDescription && (
            <div>
              <h3 className="text-bat-yellow font-batman text-lg mb-3">Detailed Description</h3>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line max-h-96 overflow-y-auto bg-gotham-gray p-4 rounded-lg">
                {protocolSection.descriptionModule.detailedDescription}
              </div>
            </div>
          )}

          {protocolSection.designModule?.designInfo && (
            <div>
              <h3 className="text-bat-yellow font-batman text-lg mb-3">Study Design</h3>
              <div className="grid md:grid-cols-3 gap-4 text-gray-300">
                {protocolSection.designModule.designInfo.allocation && (
                  <div className="bg-gotham-gray p-3 rounded-lg">
                    <span className="text-bat-yellow text-sm">Allocation:</span>
                    <p>{protocolSection.designModule.designInfo.allocation}</p>
                  </div>
                )}
                {protocolSection.designModule.designInfo.interventionModel && (
                  <div className="bg-gotham-gray p-3 rounded-lg">
                    <span className="text-bat-yellow text-sm">Model:</span>
                    <p>{protocolSection.designModule.designInfo.interventionModel}</p>
                  </div>
                )}
                {protocolSection.designModule.designInfo.primaryPurpose && (
                  <div className="bg-gotham-gray p-3 rounded-lg">
                    <span className="text-bat-yellow text-sm">Purpose:</span>
                    <p>{protocolSection.designModule.designInfo.primaryPurpose}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {protocolSection.sponsorCollaboratorsModule && (
            <div>
              <h3 className="text-bat-yellow font-batman text-lg mb-3">Sponsors & Collaborators</h3>
              <div className="space-y-2 text-gray-300">
                {protocolSection.sponsorCollaboratorsModule.leadSponsor && (
                  <p><span className="text-bat-yellow">Lead Sponsor:</span> {protocolSection.sponsorCollaboratorsModule.leadSponsor.name}</p>
                )}
                {protocolSection.sponsorCollaboratorsModule.collaborators && protocolSection.sponsorCollaboratorsModule.collaborators.length > 0 && (
                  <div>
                    <span className="text-bat-yellow">Collaborators:</span>
                    <ul className="ml-4 mt-1">
                      {protocolSection.sponsorCollaboratorsModule.collaborators.map((collab, index) => (
                        <li key={index} className="text-sm">• {collab.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicalTrialDetail;
