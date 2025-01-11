import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "@/components/ui/button";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import client from "@/api/client";
import { cn } from "@/lib/utils";

interface CarMakeComboBoxProps {
  form: any;
  name: string;
  label: string;
}

export function CarMakeFormField({ form, name, label }: CarMakeComboBoxProps) {
  const [carMakes, setCarMakes] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchCarMakes = async () => {
      try {
        const response = await client.get("/carmakes");
        setCarMakes(response.data);
      } catch (error) {
        console.error("Error fetching car makes:", error);
      }
    };
    fetchCarMakes();
  }, []);

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-sm">{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                  disabled={!carMakes.length}
                >
                  {field.value
                    ? carMakes.find((carMake) => carMake.id === field.value)
                        ?.name
                    : "Select car make"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-1">
              <Command>
                <CommandInput
                  placeholder="Search car make..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No car make found.</CommandEmpty>
                  {carMakes.map((carMake) => (
                    <CommandItem
                      key={carMake.id}
                      onSelect={() => {
                        form.setValue("carmake", carMake.id);
                      }}
                    >
                      {carMake.name}
                      <Check
                        className={`ml-auto ${carMake.id === field.value ? "opacity-100" : "opacity-0"}`}
                      />
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
