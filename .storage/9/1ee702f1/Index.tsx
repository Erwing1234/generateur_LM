import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Copy, Download } from 'lucide-react';
import { toast } from 'sonner';

export default function MotivationLetterGenerator() {
  const [formData, setFormData] = useState({
    fullName: '',
    position: '',
    company: '',
    skills: '',
    experience: '',
    education: '',
    motivation: '',
    style: 'professional'
  });

  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const generateLetter = () => {
    // Validation
    if (!formData.fullName || !formData.position || !formData.company) {
      toast.error('Veuillez remplir au moins votre nom, le poste et l\'entreprise');
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation with setTimeout
    setTimeout(() => {
      const letter = createMotivationLetter(formData);
      setGeneratedLetter(letter);
      setIsGenerating(false);
      toast.success('Lettre de motivation générée avec succès!');
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    toast.success('Copié dans le presse-papiers!');
  };

  const downloadAsTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Lettre_Motivation_${formData.position.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Téléchargement démarré!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8">
          Générateur de Lettre de Motivation IA
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Vos informations</CardTitle>
              <CardDescription>Complétez les champs pour générer une lettre de motivation personnalisée</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nom complet</Label>
                <Input 
                  id="fullName" 
                  placeholder="ex: Jean Dupont"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="position">Poste visé</Label>
                <Input 
                  id="position" 
                  placeholder="ex: Développeur Full Stack"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Entreprise</Label>
                <Input 
                  id="company" 
                  placeholder="ex: Tech Solutions SA"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="skills">Compétences clés</Label>
                <Textarea 
                  id="skills" 
                  placeholder="ex: JavaScript, React, Node.js, gestion de projet..."
                  value={formData.skills}
                  onChange={(e) => handleInputChange('skills', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Expérience professionnelle</Label>
                <Textarea 
                  id="experience" 
                  placeholder="ex: 3 ans en tant que développeur web chez XYZ..."
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="education">Formation</Label>
                <Input 
                  id="education" 
                  placeholder="ex: Master en Informatique à l'Université de..."
                  value={formData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="motivation">Motivation pour ce poste</Label>
                <Textarea 
                  id="motivation" 
                  placeholder="ex: Ce poste m'intéresse car..."
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="style">Style de lettre</Label>
                <Select 
                  value={formData.style}
                  onValueChange={(value) => handleInputChange('style', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professionnel</SelectItem>
                    <SelectItem value="creative">Créatif</SelectItem>
                    <SelectItem value="formal">Formel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={generateLetter}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Génération en cours...
                  </>
                ) : "Générer la lettre de motivation"}
              </Button>
            </CardFooter>
          </Card>
          
          {/* Output Card */}
          <Card>
            <CardHeader>
              <CardTitle>Lettre de motivation</CardTitle>
              <CardDescription>Résultat généré par l'IA</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="preview">
                <TabsList className="mb-4">
                  <TabsTrigger value="preview">Aperçu</TabsTrigger>
                  <TabsTrigger value="edit">Éditer</TabsTrigger>
                </TabsList>
                
                <TabsContent value="preview">
                  <div className="p-4 bg-white border rounded-md min-h-[400px] whitespace-pre-line">
                    {generatedLetter ? (
                      generatedLetter
                    ) : (
                      <div className="h-full flex items-center justify-center text-muted-foreground">
                        Remplissez le formulaire et cliquez sur "Générer" pour créer votre lettre de motivation
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="edit">
                  <Textarea 
                    value={generatedLetter} 
                    onChange={(e) => setGeneratedLetter(e.target.value)}
                    className="min-h-[400px]"
                    placeholder="La lettre générée apparaîtra ici pour édition"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={copyToClipboard}
                disabled={!generatedLetter}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copier
              </Button>
              <Button 
                onClick={downloadAsTxt}
                disabled={!generatedLetter}
              >
                <Download className="mr-2 h-4 w-4" />
                Télécharger
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>© 2025 Générateur de Lettre de Motivation IA - Tous droits réservés</p>
        </footer>
      </div>
    </div>
  );
}

function createMotivationLetter(data: {
  fullName: string;
  position: string;
  company: string;
  skills: string;
  experience: string;
  education: string;
  motivation: string;
  style: string;
}) {
  // Date formatting
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('fr-FR', options);
  
  // Different letter styles
  let letter = '';
  const signature = `${data.fullName}\n\n`;
  
  if (data.style === 'professional') {
    letter = `${data.fullName}
[Votre adresse]
[Votre téléphone]
[Votre email]

${formattedDate}

Objet : Candidature au poste de ${data.position}

Madame, Monsieur,

C'est avec un grand intérêt que je vous soumets ma candidature pour le poste de ${data.position} au sein de votre entreprise ${data.company}.

`;

    if (data.motivation) {
      letter += `${data.motivation}\n\n`;
    } else {
      letter += `Attiré par les valeurs et la réputation d'excellence de ${data.company}, je suis convaincu(e) que mes compétences et mon expérience correspondent parfaitement au profil que vous recherchez.\n\n`;
    }

    if (data.experience) {
      letter += `Au cours de ma carrière professionnelle, ${data.experience} Cette expérience m'a permis de développer une solide compréhension des enjeux de ce secteur et d'acquérir les compétences nécessaires pour réussir dans ce rôle.\n\n`;
    }

    if (data.skills) {
      letter += `Je possède des compétences avancées en ${data.skills}, qui seraient particulièrement pertinentes pour ce poste.\n\n`;
    }

    if (data.education) {
      letter += `Ma formation en ${data.education} m'a fourni une base solide et les connaissances théoriques nécessaires pour exceller dans ce domaine.\n\n`;
    }

    letter += `Je serais ravi(e) de pouvoir discuter de ma candidature lors d'un entretien. Je reste à votre disposition pour toute information complémentaire.

Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

${signature}`;
  }
  else if (data.style === 'creative') {
    letter = `${data.fullName}
[Coordonnées]

${formattedDate}

OBJET : ${data.position.toUpperCase()} - UNE OPPORTUNITÉ QUE JE SOUHAITE SAISIR !

Cher recruteur chez ${data.company},

Quand passion et opportunité se rencontrent, quelque chose d'extraordinaire se produit. C'est exactement ce que je ressens à l'idée de rejoindre votre équipe en tant que ${data.position}.

`;

    if (data.motivation) {
      letter += `${data.motivation}\n\n`;
    } else {
      letter += `Votre entreprise est reconnue pour son innovation et sa créativité, des valeurs que je partage profondément et qui me motivent chaque jour.\n\n`;
    }

    if (data.experience) {
      letter += `Mon parcours ? ${data.experience} Ce chemin m'a façonné et préparé pour relever de nouveaux défis créatifs.\n\n`;
    }

    if (data.skills) {
      letter += `Mon boîte à outils contient : ${data.skills}. Des compétences que je mets au service de projets ambitieux et stimulants.\n\n`;
    }

    if (data.education) {
      letter += `Avec une formation en ${data.education}, j'ai cultivé à la fois ma créativité et ma rigueur.\n\n`;
    }

    letter += `Imaginons un instant ce que nous pourrions accomplir ensemble ! Je serais enchanté(e) de vous rencontrer pour discuter de la façon dont je pourrais contribuer au succès de ${data.company}.

Créativement vôtre,

${signature}`;
  } 
  else { // formal
    letter = `${data.fullName}
[Adresse complète]
[Téléphone]
[Email professionnel]

${formattedDate}

${data.company}
[Adresse de l'entreprise]

Objet : Candidature au poste de ${data.position}

Madame, Monsieur,

Je me permets de vous adresser ma candidature pour le poste de ${data.position} actuellement ouvert au sein de votre prestigieuse entreprise ${data.company}.

`;

    if (data.motivation) {
      letter += `${data.motivation}\n\n`;
    } else {
      letter += `La réputation d'excellence de votre entreprise et les valeurs qu'elle véhicule correspondent parfaitement à mes aspirations professionnelles.\n\n`;
    }

    if (data.experience) {
      letter += `Mon parcours professionnel comprend notamment ${data.experience} Cette expérience significative m'a permis d'acquérir une expertise solide et pertinente pour le poste proposé.\n\n`;
    }

    if (data.skills) {
      letter += `Je maîtrise plusieurs compétences essentielles telles que ${data.skills}, qui constituent des atouts considérables pour exercer efficacement les fonctions de ${data.position}.\n\n`;
    }

    if (data.education) {
      letter += `Titulaire d'une formation en ${data.education}, j'ai pu développer un socle de connaissances théoriques et pratiques parfaitement adapté aux exigences du poste.\n\n`;
    }

    letter += `Je vous serais reconnaissant(e) de bien vouloir étudier ma candidature. Je me tiens à votre entière disposition pour un entretien qui me permettrait de vous exposer plus en détail mes motivations.

Dans l'attente d'une réponse de votre part, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations les plus respectueuses.

${signature}`;
  }
  
  return letter;
}