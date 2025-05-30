"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table"
import { Upload, Download, FileText, Calendar, User, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function AdminDocumentsPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [documentType, setDocumentType] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  // Mock data for uploaded documents
  const documents = [
    {
      id: 1,
      name: "SACCO Constitution 2024",
      type: "Constitution",
      uploadedBy: "John Admin",
      uploadedDate: "2024-01-15",
      fileSize: "2.4 MB",
      status: "Active",
    },
    {
      id: 2,
      name: "Member By-laws v2.1",
      type: "By-laws",
      uploadedBy: "Jane Manager",
      uploadedDate: "2024-01-10",
      fileSize: "1.8 MB",
      status: "Active",
    },
    {
      id: 3,
      name: "Privacy Policy 2024",
      type: "Policy",
      uploadedBy: "John Admin",
      uploadedDate: "2024-01-05",
      fileSize: "856 KB",
      status: "Active",
    },
    {
      id: 4,
      name: "Loan Policy Guidelines",
      type: "Policy",
      uploadedBy: "Sarah Treasurer",
      uploadedDate: "2023-12-20",
      fileSize: "1.2 MB",
      status: "Archived",
    },
  ]

  const columns = [
    {
      accessorKey: "name",
      header: "Document Name",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-2">
          <FileText className="h-4 w-4 text-blue-500" />
          <span className="font-medium">{row.getValue("name")}</span>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }: any) => <Badge variant="outline">{row.getValue("type")}</Badge>,
    },
    {
      accessorKey: "uploadedBy",
      header: "Uploaded By",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-1">
          <User className="h-3 w-3 text-gray-500" />
          <span>{row.getValue("uploadedBy")}</span>
        </div>
      ),
    },
    {
      accessorKey: "uploadedDate",
      header: "Upload Date",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-1">
          <Calendar className="h-3 w-3 text-gray-500" />
          <span>{row.getValue("uploadedDate")}</span>
        </div>
      ),
    },
    {
      accessorKey: "fileSize",
      header: "Size",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => {
        const status = row.getValue("status")
        return <Badge variant={status === "Active" ? "default" : "secondary"}>{status}</Badge>
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-3 w-3 mr-1" />
            Download
          </Button>
          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      ),
    },
  ]

  const handleFileUpload = async () => {
    if (!selectedFile || !documentType) return

    setIsUploading(true)
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      setSelectedFile(null)
      setDocumentType("")
      // Show success message
    }, 2000)
  }

  return (
    <DashboardLayout
      role="admin"
      user={{
        name: "Admin User",
        email: "admin@saccosmart.com",
        avatar: "/placeholder.svg?height=32&width=32",
      }}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
            <p className="text-gray-600">Manage SACCO legal documents and policies</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-sacco-blue hover:bg-sacco-blue/90">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Upload New Document</DialogTitle>
                <DialogDescription>Upload SACCO constitution, by-laws, or policy documents</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="document-type">Document Type</Label>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="constitution">SACCO Constitution</SelectItem>
                      <SelectItem value="bylaws">By-laws</SelectItem>
                      <SelectItem value="policy">Policy Document</SelectItem>
                      <SelectItem value="procedure">Procedure Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="file-upload">Choose File</Label>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  />
                  <p className="text-sm text-gray-500 mt-1">Supported formats: PDF, DOC, DOCX (Max 10MB)</p>
                </div>
                {selectedFile && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                )}
                <Button
                  onClick={handleFileUpload}
                  disabled={!selectedFile || !documentType || isUploading}
                  className="w-full"
                >
                  {isUploading ? "Uploading..." : "Upload Document"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Document Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sacco-blue">{documents.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {documents.filter((doc) => doc.status === "Active").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Document Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{new Set(documents.map((doc) => doc.type)).size}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Storage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">6.3 MB</div>
            </CardContent>
          </Card>
        </div>

        {/* Documents Table */}
        <Card>
          <CardHeader>
            <CardTitle>Document Library</CardTitle>
            <CardDescription>All uploaded SACCO documents and policies</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={documents} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
