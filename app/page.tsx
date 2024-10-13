"use client";

import { useState, useRef } from 'react';
import QRCodeGenerator from '../components/QRCodeGenerator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, Upload } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const qrTypes = [
  { value: 'text', label: 'Text' },
  { value: 'url', label: 'URL' },
  { value: 'vcard', label: 'vCard' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'sms', label: 'SMS' },
  { value: 'wifi', label: 'Wi-Fi' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'maps', label: 'Maps' },
];

const errorLevels = ['L', 'M', 'Q', 'H'];

interface VCardData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  street: string;
  city: string;
  zip: string;
  state: string;
  country: string;
  website: string;
}

interface EmailData {
  email: string;
  subject: string;
  message: string;
}

interface ImageSettings {
  src: string;
  width: number;
  height: number;
  opacity: number;
  centerImage: boolean;
  x: number;
  y: number;
}

export default function Home() {
  const [content, setContent] = useState('');
  const [type, setType] = useState('text');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [size, setSize] = useState(200);
  const [errorLevel, setErrorLevel] = useState('M');
  const [margin, setMargin] = useState(4);
  const [title, setTitle] = useState('');
  const [vCardData, setVCardData] = useState<VCardData>({
    firstName: '', lastName: '', phone: '', email: '', company: '',
    street: '', city: '', zip: '', state: '', country: '', website: ''
  });
  const [emailData, setEmailData] = useState<EmailData>({
    email: '', subject: '', message: ''
  });
  const [imageSettings, setImageSettings] = useState<ImageSettings>({
    src: '',
    width: 50,
    height: 50,
    opacity: 1,
    centerImage: true,
    x: 0,
    y: 0,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleTypeChange = (value: string) => {
    setType(value);
    setContent('');
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(e.target.value);
  };

  const handleSizeChange = (value: number[]) => {
    setSize(value[0]);
  };

  const handleMarginChange = (value: number[]) => {
    setMargin(value[0]);
  };

  const handleVCardChange = (field: keyof VCardData, value: string) => {
    setVCardData(prev => ({ ...prev, [field]: value }));
  };

  const handleEmailChange = (field: keyof EmailData, value: string) => {
    setEmailData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSettings(prev => ({ ...prev, src: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSettingChange = (field: keyof ImageSettings, value: number | boolean) => {
    setImageSettings(prev => ({ ...prev, [field]: value }));
  };

  const getVCardContent = () => {
    return Object.values(vCardData).join('\n');
  };

  const getEmailContent = () => {
    return `${emailData.email}\n${emailData.subject}\n${emailData.message}`;
  };

  const getContent = () => {
    if (type === 'vcard') return getVCardContent();
    if (type === 'email') return getEmailContent();
    return content;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <QrCode className="mr-2" />
            Advanced QR Code Generator
          </CardTitle>
          <CardDescription>Customize your QR code with various options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Select onValueChange={handleTypeChange} value={type}>
                <SelectTrigger>
                  <SelectValue placeholder="Select QR code type" />
                </SelectTrigger>
                <SelectContent>
                  {qrTypes.map((qrType) => (
                    <SelectItem key={qrType.value} value={qrType.value}>
                      {qrType.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {type === 'vcard' ? (
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="First Name" value={vCardData.firstName} onChange={(e) => handleVCardChange('firstName', e.target.value)} />
                  <Input placeholder="Last Name" value={vCardData.lastName} onChange={(e) => handleVCardChange('lastName', e.target.value)} />
                  <Input placeholder="Phone" value={vCardData.phone} onChange={(e) => handleVCardChange('phone', e.target.value)} />
                  <Input placeholder="Email" value={vCardData.email} onChange={(e) => handleVCardChange('email', e.target.value)} />
                  <Input placeholder="Company" value={vCardData.company} onChange={(e) => handleVCardChange('company', e.target.value)} />
                  <Input placeholder="Street" value={vCardData.street} onChange={(e) => handleVCardChange('street', e.target.value)} />
                  <Input placeholder="City" value={vCardData.city} onChange={(e) => handleVCardChange('city', e.target.value)} />
                  <Input placeholder="ZIP" value={vCardData.zip} onChange={(e) => handleVCardChange('zip', e.target.value)} />
                  <Input placeholder="State" value={vCardData.state} onChange={(e) => handleVCardChange('state', e.target.value)} />
                  <Input placeholder="Country" value={vCardData.country} onChange={(e) => handleVCardChange('country', e.target.value)} />
                  <Input placeholder="Website" value={vCardData.website} onChange={(e) => handleVCardChange('website', e.target.value)} />
                </div>
              ) : type === 'email' ? (
                <div className="space-y-4">
                  <Input placeholder="Email" value={emailData.email} onChange={(e) => handleEmailChange('email', e.target.value)} />
                  <Input placeholder="Subject" value={emailData.subject} onChange={(e) => handleEmailChange('subject', e.target.value)} />
                  <Textarea placeholder="Message" value={emailData.message} onChange={(e) => handleEmailChange('message', e.target.value)} />
                </div>
              ) : (
                <Input
                  type="text"
                  placeholder={`Enter ${type} content`}
                  value={content}
                  onChange={handleContentChange}
                  className="w-full"
                />
              )}

              <Input
                type="text"
                placeholder="QR Code Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <div className="flex space-x-4">
                <div className="flex-1">
                  <Label>Foreground Color</Label>
                  <Input
                    type="color"
                    value={fgColor}
                    onChange={(e) => handleColorChange(e, setFgColor)}
                    className="h-10"
                  />
                </div>
                <div className="flex-1">
                  <Label>Background Color</Label>
                  <Input
                    type="color"
                    value={bgColor}
                    onChange={(e) => handleColorChange(e, setBgColor)}
                    className="h-10"
                  />
                </div>
              </div>

              <div>
                <Label>Size: {size}px</Label>
                <Slider
                  min={100}
                  max={400}
                  step={10}
                  value={[size]}
                  onValueChange={handleSizeChange}
                />
              </div>

              <div>
                <Label>Margin: {margin}</Label>
                <Slider
                  min={0}
                  max={10}
                  step={1}
                  value={[margin]}
                  onValueChange={handleMarginChange}
                />
              </div>

              <Select onValueChange={setErrorLevel} value={errorLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Error Correction Level" />
                </SelectTrigger>
                <SelectContent>
                  {errorLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                  <Upload className="mr-2 h-4 w-4" /> Upload Image
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {imageSettings.src && (
                <>
                  <div>
                    <Label>Image Width: {imageSettings.width}px</Label>
                    <Slider
                      min={10}
                      max={100}
                      step={1}
                      value={[imageSettings.width]}
                      onValueChange={(value) => handleImageSettingChange('width', value[0])}
                    />
                  </div>

                  <div>
                    <Label>Image Height: {imageSettings.height}px</Label>
                    <Slider
                      min={10}
                      max={100}
                      step={1}
                      value={[imageSettings.height]}
                      onValueChange={(value) => handleImageSettingChange('height', value[0])}
                    />
                  </div>

                  <div>
                    <Label>Image Opacity: {imageSettings.opacity}</Label>
                    <Slider
                      min={0}
                      max={1}
                      step={0.1}
                      value={[imageSettings.opacity]}
                      onValueChange={(value) => handleImageSettingChange('opacity', value[0])}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={imageSettings.centerImage}
                      onCheckedChange={(checked) => handleImageSettingChange('centerImage', checked)}
                    />
                    <Label>Center Image</Label>
                  </div>

                  {!imageSettings.centerImage && (
                    <>
                      <div>
                        <Label>Image X Position: {imageSettings.x}</Label>
                        <Slider
                          min={0}
                          max={size - imageSettings.width}
                          step={1}
                          value={[imageSettings.x]}
                          onValueChange={(value) => handleImageSettingChange('x', value[0])}
                        />
                      </div>

                      <div>
                        <Label>Image Y Position: {imageSettings.y}</Label>
                        <Slider
                          min={0}
                          max={size - imageSettings.height}
                          step={1}
                          value={[imageSettings.y]}
                          onValueChange={(value) => handleImageSettingChange('y', value[0])}
                        />
                      </div>
                    </>
                  )}
                </>
              )}

              <QRCodeGenerator
                content={getContent()}
                type={type}
                fgColor={fgColor}
                bgColor={bgColor}
                size={size}
                errorLevel={errorLevel}
                margin={margin}
                title={title}
                imageSettings={imageSettings}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}