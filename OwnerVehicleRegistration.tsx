import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { insertVehicleSchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Extend the vehicle schema with additional validation
const ownerVehicleFormSchema = insertVehicleSchema.extend({
  ownerId: z.number().default(1), // In a real app, this would come from auth
  features: z.array(z.string()).default([]),
  imageUrl: z.string().optional(),
  licensePlate: z.string().min(7, "Placa do veículo inválida"),
  insuranceInfo: z.string().min(3, "Informações de seguro são obrigatórias"),
  maintenanceHistory: z.string().optional(),
  terms: z.boolean().refine(val => val === true, {
    message: "Você precisa aceitar os termos de uso."
  })
});

type OwnerVehicleFormValues = z.infer<typeof ownerVehicleFormSchema>;

const OwnerVehicleRegistration = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define default values for form
  const defaultValues: Partial<OwnerVehicleFormValues> = {
    ownerId: 1,
    type: "car",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    range: 300,
    price: 100,
    location: "",
    city: "",
    state: "",
    available: true,
    seats: 5,
    features: [],
    licensePlate: "",
    insuranceInfo: "",
    maintenanceHistory: "",
    terms: false
  };

  const form = useForm<OwnerVehicleFormValues>({
    resolver: zodResolver(ownerVehicleFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: OwnerVehicleFormValues) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/vehicles", data);
      
      // Invalidate vehicles query to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/vehicles"] });
      
      toast({
        title: "Veículo cadastrado com sucesso!",
        description: "Seu veículo foi cadastrado e estará disponível para aluguel na plataforma.",
      });
      
      // Reset form
      form.reset(defaultValues);
    } catch (error) {
      toast({
        title: "Erro ao cadastrar veículo",
        description: "Ocorreu um erro durante o cadastro. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Cadastre seu Veículo para Locação</h1>
            <p className="text-gray-600 mt-2">
              Disponibilize seu veículo elétrico para aluguel e gere renda extra
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Informações do Proprietário e Veículo</CardTitle>
              <CardDescription>
                Preencha todos os campos com as informações detalhadas do seu veículo elétrico.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Type */}
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Veículo</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="car">Carro Elétrico</SelectItem>
                              <SelectItem value="motorcycle">Moto Elétrica</SelectItem>
                              <SelectItem value="scooter">Patinete Elétrico</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* License Plate */}
                    <FormField
                      control={form.control}
                      name="licensePlate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Placa do Veículo</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: ABC1234" {...field} />
                          </FormControl>
                          <FormDescription>
                            A placa do veículo será verificada durante a aprovação
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Brand */}
                    <FormField
                      control={form.control}
                      name="brand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Marca</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Tesla, Volvo, BMW" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Model */}
                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Modelo</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Model 3, XC40 Recharge" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Year */}
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ano</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min={2010} 
                              max={new Date().getFullYear()} 
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value))} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Range */}
                    <FormField
                      control={form.control}
                      name="range"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Autonomia (km)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min={50} 
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value))} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Price */}
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor da Diária (R$)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min={10} 
                              step={0.01}
                              {...field}
                              onChange={e => field.onChange(parseFloat(e.target.value))} 
                            />
                          </FormControl>
                          <FormDescription>
                            Defina um valor competitivo para aumentar suas chances de locação
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Location */}
                    <div className="md:col-span-3">
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Endereço</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Av. Paulista, 1000" {...field} />
                            </FormControl>
                            <FormDescription>
                              Este é o endereço onde o veículo estará disponível para retirada
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* City */}
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cidade</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: São Paulo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* State */}
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: SP" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Seats */}
                    <FormField
                      control={form.control}
                      name="seats"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lugares</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min={1} 
                              max={9}
                              value={field.value?.toString() || ""}
                              onChange={e => field.onChange(parseInt(e.target.value) || undefined)} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Insurance Info */}
                  <FormField
                    control={form.control}
                    name="insuranceInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Informações do Seguro</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Informe detalhes sobre a apólice de seguro do veículo"
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Informações como seguradora, número da apólice e cobertura
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Maintenance History */}
                  <FormField
                    control={form.control}
                    name="maintenanceHistory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Histórico de Manutenção (opcional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Descreva o histórico de manutenção do veículo"
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Inclua informações sobre revisões, troca de bateria e outros serviços
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Features */}
                  <FormField
                    control={form.control}
                    name="features"
                    render={() => (
                      <FormItem>
                        <FormLabel>Características</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                          {[
                            { id: "piloto-automatico", label: "Piloto Automático" },
                            { id: "ar-condicionado", label: "Ar-condicionado" },
                            { id: "awd", label: "AWD (Tração nas 4 rodas)" },
                            { id: "carregamento-rapido", label: "Carregamento Rápido" },
                            { id: "gps", label: "GPS Integrado" },
                            { id: "som-premium", label: "Sistema de Som Premium" },
                            { id: "cameras-360", label: "Câmeras 360°" },
                            { id: "bancos-aquecidos", label: "Bancos Aquecidos" },
                            { id: "wifi-integrado", label: "Wi-Fi Integrado" }
                          ].map((feature) => (
                            <FormField
                              key={feature.id}
                              control={form.control}
                              name="features"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={feature.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(feature.label)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, feature.label])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== feature.label
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {feature.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Image URL */}
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL da Imagem do Veículo (opcional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/my-vehicle.jpg" {...field} />
                        </FormControl>
                        <FormDescription>
                          Adicione uma imagem de boa qualidade do seu veículo para atrair mais locatários
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Availability */}
                  <FormField
                    control={form.control}
                    name="available"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Disponibilidade Imediata
                          </FormLabel>
                          <FormDescription>
                            Seu veículo estará disponível imediatamente após aprovação pela nossa equipe
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Terms */}
                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Concordo com os <a href="#" className="text-primary hover:underline">termos de uso</a> e <a href="#" className="text-primary hover:underline">política de privacidade</a>
                          </FormLabel>
                          <FormDescription>
                            Ao concordar, você autoriza a Slaup Hub a listar seu veículo na plataforma e realizar locações
                          </FormDescription>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full mt-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Cadastrando..." : "Cadastrar Veículo para Locação"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OwnerVehicleRegistration;