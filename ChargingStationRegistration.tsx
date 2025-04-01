import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { insertChargingStationSchema } from "@shared/schema";
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
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Extend the charging station schema with additional validation
const stationFormSchema = insertChargingStationSchema.extend({
  ownerId: z.number().default(1), // In a real app, this would come from auth
  connectorTypes: z.array(z.string()).min(1, {
    message: "Selecione pelo menos um tipo de conector."
  }),
  terms: z.boolean().refine(val => val === true, {
    message: "Você precisa aceitar os termos de uso."
  })
});

type StationFormValues = z.infer<typeof stationFormSchema>;

const ChargingStationRegistration = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define default values for form
  const defaultValues: Partial<StationFormValues> = {
    ownerId: 1,
    name: "",
    location: "",
    city: "",
    state: "",
    price: 1.0,
    connectorTypes: [],
    power: 22,
    available: true,
    requiresBooking: false,
    terms: false
  };

  const form = useForm<StationFormValues>({
    resolver: zodResolver(stationFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: StationFormValues) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/charging-stations", data);
      
      // Invalidate charging stations query to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/charging-stations"] });
      
      toast({
        title: "Ponto de recarga cadastrado com sucesso!",
        description: "Seu ponto de recarga foi cadastrado e estará disponível na plataforma.",
      });
      
      // Reset form
      form.reset(defaultValues);
    } catch (error) {
      toast({
        title: "Erro ao cadastrar ponto de recarga",
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
            <h1 className="text-3xl font-bold">Cadastre seu Ponto de Recarga</h1>
            <p className="text-gray-600 mt-2">
              Disponibilize seu ponto de recarga para veículos elétricos e gere renda extra
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Informações do Ponto de Recarga</CardTitle>
              <CardDescription>
                Preencha todos os campos com as informações do seu ponto de recarga.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome do Ponto de Recarga</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Estação Shopping Ibirapuera" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Price */}
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor por kWh (R$)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min={0.1} 
                              step={0.01}
                              {...field}
                              onChange={e => field.onChange(parseFloat(e.target.value))} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Power */}
                    <FormField
                      control={form.control}
                      name="power"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Potência (kW)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min={3.7} 
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value))} 
                            />
                          </FormControl>
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
                              <Input placeholder="Ex: Av. Ibirapuera, 3103" {...field} />
                            </FormControl>
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

                    {/* Image URL */}
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL da Imagem (opcional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/my-station.jpg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Connector Types */}
                  <FormField
                    control={form.control}
                    name="connectorTypes"
                    render={() => (
                      <FormItem>
                        <FormLabel>Tipos de Conectores</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                          {[
                            { id: "tipo-1", label: "Tipo 1 (J1772)" },
                            { id: "tipo-2", label: "Tipo 2" },
                            { id: "ccs", label: "CCS" },
                            { id: "chademo", label: "CHAdeMO" },
                            { id: "tesla", label: "Tesla" },
                            { id: "schuko", label: "Schuko" },
                          ].map((connector) => (
                            <FormField
                              key={connector.id}
                              control={form.control}
                              name="connectorTypes"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={connector.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(connector.label)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, connector.label])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== connector.label
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {connector.label}
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
                            Seu ponto de recarga estará disponível imediatamente após aprovação
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

                  {/* Requires Booking */}
                  <FormField
                    control={form.control}
                    name="requiresBooking"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Requer Agendamento
                          </FormLabel>
                          <FormDescription>
                            Os usuários precisarão agendar um horário para utilizar este ponto de recarga
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
                    {isSubmitting ? "Cadastrando..." : "Cadastrar Ponto de Recarga"}
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

export default ChargingStationRegistration;
