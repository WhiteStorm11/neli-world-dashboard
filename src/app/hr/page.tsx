"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  UserCheck, 
  Calendar,
  Star,
  Clock,
  Users
} from "lucide-react";
import { HRRecord, Employee } from "@/types";

const hrTypes = [
  { value: 'attendance', label: 'Asistencia' },
  { value: 'evaluation', label: 'Evaluación' },
  { value: 'vacation', label: 'Vacaciones' },
  { value: 'event', label: 'Evento' }
];

const attendanceStatuses = [
  'Presente',
  'Ausente',
  'Tardanza',
  'Permiso'
];

const vacationStatuses = [
  'Solicitado',
  'Aprobado',
  'Rechazado',
  'En curso'
];

export default function HRPage() {
  const [hrRecords, setHrRecords] = useState<HRRecord[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<HRRecord | null>(null);
  const [statistics, setStatistics] = useState({
    attendance: 0,
    evaluation: 0,
    vacation: 0,
    event: 0,
  });

  // Form state
  const [formData, setFormData] = useState({
    employeeId: "",
    type: "attendance" as "attendance" | "evaluation" | "vacation" | "event",
    date: new Date().toISOString().split('T')[0],
    status: "",
    notes: "",
    rating: 5,
    data: {} as any,
  });

  useEffect(() => {
    fetchHRRecords();
    fetchEmployees();
  }, [selectedType, selectedEmployee]);

  const fetchHRRecords = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedType) params.append('type', selectedType);
      if (selectedEmployee) params.append('employeeId', selectedEmployee);

      const response = await fetch(`/api/hr?${params}`);
      const data = await response.json();
      
      if (response.ok) {
        setHrRecords(data.hrRecords);
        setStatistics(data.statistics);
      }
    } catch (error) {
      console.error('Error fetching HR records:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/employees');
      const data = await response.json();
      
      if (response.ok) {
        setEmployees(data.employees);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingRecord 
        ? `/api/hr/${editingRecord._id}`
        : '/api/hr';
      
      const method = editingRecord ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchHRRecords();
        resetForm();
        setIsAddDialogOpen(false);
        setEditingRecord(null);
      }
    } catch (error) {
      console.error('Error saving HR record:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      employeeId: "",
      type: "attendance",
      date: new Date().toISOString().split('T')[0],
      status: "",
      notes: "",
      rating: 5,
      data: {},
    });
  };

  const handleEdit = (record: HRRecord) => {
    setEditingRecord(record);
    setFormData({
      employeeId: typeof record.employeeId === 'string' ? record.employeeId : record.employeeId._id,
      type: record.type,
      date: new Date(record.date).toISOString().split('T')[0],
      status: record.status || "",
      notes: record.notes || "",
      rating: record.rating || 5,
      data: record.data || {},
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este registro?')) {
      try {
        const response = await fetch(`/api/hr/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchHRRecords();
        }
      } catch (error) {
        console.error('Error deleting HR record:', error);
      }
    }
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      attendance: { variant: "default" as const, icon: Clock, label: "Asistencia" },
      evaluation: { variant: "secondary" as const, icon: Star, label: "Evaluación" },
      vacation: { variant: "outline" as const, icon: Calendar, label: "Vacaciones" },
      event: { variant: "destructive" as const, icon: Users, label: "Evento" }
    };

    const config = variants[type as keyof typeof variants];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getEmployeeName = (employeeId: any) => {
    if (typeof employeeId === 'object' && employeeId.firstName) {
      return `${employeeId.firstName} ${employeeId.lastName}`;
    }
    const employee = employees.find(emp => emp._id === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}` : 'N/A';
  };

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const breadcrumbs = [{ label: "Recursos Humanos" }];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Recursos Humanos</h1>
            <p className="text-muted-foreground">
              Gestión de asistencia, evaluaciones y eventos del personal
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { resetForm(); setEditingRecord(null); }}>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Registro
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingRecord ? 'Editar Registro' : 'Nuevo Registro de RRHH'}
                </DialogTitle>
                <DialogDescription>
                  {editingRecord 
                    ? 'Modifica la información del registro'
                    : 'Agrega un nuevo registro de recursos humanos'
                  }
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employeeId">Empleado</Label>
                    <Select value={formData.employeeId} onValueChange={(value) => setFormData({...formData, employeeId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar empleado" />
                      </SelectTrigger>
                      <SelectContent>
                        {employees.map((employee) => (
                          <SelectItem key={employee._id} value={employee._id}>
                            {employee.firstName} {employee.lastName} - {employee.employeeId}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="type">Tipo</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value as any, status: ""})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {hrTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Fecha</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Estado</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.type === 'attendance' && attendanceStatuses.map((status) => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                        {formData.type === 'vacation' && vacationStatuses.map((status) => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                        {formData.type === 'evaluation' && (
                          <>
                            <SelectItem value="Completada">Completada</SelectItem>
                            <SelectItem value="Pendiente">Pendiente</SelectItem>
                          </>
                        )}
                        {formData.type === 'event' && (
                          <>
                            <SelectItem value="Programado">Programado</SelectItem>
                            <SelectItem value="Completado">Completado</SelectItem>
                            <SelectItem value="Cancelado">Cancelado</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {formData.type === 'evaluation' && (
                  <div>
                    <Label htmlFor="rating">Calificación (1-5)</Label>
                    <Select value={formData.rating.toString()} onValueChange={(value) => setFormData({...formData, rating: parseInt(value)})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <SelectItem key={rating} value={rating.toString()}>
                            {rating} - {rating === 1 ? 'Deficiente' : rating === 2 ? 'Regular' : rating === 3 ? 'Bueno' : rating === 4 ? 'Muy Bueno' : 'Excelente'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label htmlFor="notes">Notas</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Observaciones adicionales..."
                  />
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {editingRecord ? 'Actualizar' : 'Crear'} Registro
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Registros de Asistencia</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.attendance}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Evaluaciones</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.evaluation}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vacaciones</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.vacation}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eventos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.event}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Tipo de registro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos los tipos</SelectItem>
                  {hrTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Empleado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos los empleados</SelectItem>
                  {employees.map((employee) => (
                    <SelectItem key={employee._id} value={employee._id}>
                      {employee.firstName} {employee.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* HR Records Table */}
        <Card>
          <CardHeader>
            <CardTitle>Registros de Recursos Humanos</CardTitle>
            <CardDescription>
              Historial completo de asistencia, evaluaciones y eventos
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Cargando registros...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Empleado</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Calificación</TableHead>
                    <TableHead>Notas</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hrRecords.map((record) => (
                    <TableRow key={record._id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-muted-foreground" />
                          <div className="font-medium">
                            {getEmployeeName(record.employeeId)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(record.type)}</TableCell>
                      <TableCell>
                        {new Date(record.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {record.status && (
                          <Badge variant="outline">{record.status}</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {record.rating && renderRatingStars(record.rating)}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {record.notes}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(record)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(record._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
