using System;
using System.Collections.Generic;

namespace Senai.Cleveland.WebApi.Domains
{
    public partial class Medicos
    {
        public int IdMedico { get; set; }
        public string Nome { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Crm { get; set; }
        public string Especialidade { get; set; }
        public string Status { get; set; }
    }
}
