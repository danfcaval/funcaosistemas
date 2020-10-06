using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace FI.AtividadeEntrevista.Utils
{
    public static class Validator
    {

        public static bool ValidateCPF(string cpf)
        {
            var cpfNumbers = Regex.Replace(cpf, @"[\.\-]", "");
            if (Regex.IsMatch(cpfNumbers, @"^(\d)\1{10}$"))
                return false;

            var firstDigit = 0;
            var secondDigit = 0;

            for(int i = 0; i<9; i++)
            {
                firstDigit += (int)Char.GetNumericValue(cpfNumbers[i]) * (10 - i);
            }
            firstDigit = firstDigit % 11;

            if (firstDigit < 2)
                firstDigit = 0;
            else
                firstDigit = 11 - firstDigit;

            if (firstDigit != (int)Char.GetNumericValue(cpfNumbers[9]))
                return false;


            for(int i = 0; i<10; i++)
            {
                secondDigit += (int)Char.GetNumericValue(cpfNumbers[i]) * (11 - i);
            }
            secondDigit = secondDigit % 11;

            if (secondDigit < 2)
                secondDigit = 0;
            else
                secondDigit = 11 - secondDigit;

            if (secondDigit != (int)Char.GetNumericValue(cpfNumbers[10]))
                return false;


            return true;
        }

        public static bool ValidateCPFs(List<string> cpfList)
        {
            foreach(var cpf in cpfList)
            {
                var cpfNumbers = Regex.Replace(cpf, @"[\.\-]", "");
                if (Regex.IsMatch(cpfNumbers, @"^(\d)\1{10}$"))
                    return false;

                var firstDigit = 0;
                var secondDigit = 0;

                for (int i = 0; i < 9; i++)
                {
                    firstDigit += (int)Char.GetNumericValue(cpfNumbers[i]) * (10 - i);
                }
                firstDigit = firstDigit % 11;

                if (firstDigit < 2)
                    firstDigit = 0;
                else
                    firstDigit = 11 - firstDigit;

                if (firstDigit != (int)Char.GetNumericValue(cpfNumbers[9]))
                    return false;


                for (int i = 0; i < 10; i++)
                {
                    secondDigit += (int)Char.GetNumericValue(cpfNumbers[i]) * (11 - i);
                }
                secondDigit = secondDigit % 11;

                if (secondDigit < 2)
                    secondDigit = 0;
                else
                    secondDigit = 11 - secondDigit;

                if (secondDigit != (int)Char.GetNumericValue(cpfNumbers[10]))
                    return false;
            }
            return true;
        }

        public static bool ValidateDuplicates(List<string> list)
        {
            return list.GroupBy(x => x)
              .Where(g => g.Count() > 1)
              .Select(y => y.Key)
              .ToList()
              .Count() > 0;
        }
    }
}
