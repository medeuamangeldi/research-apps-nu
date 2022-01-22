import sys
import numpy as np
sys.stdout.reconfigure(encoding='utf-8')

def func(x):
    return float(sys.argv[1]) + (float(sys.argv[2])-float(sys.argv[1]))*((1+float(sys.argv[3])*x)**float(sys.argv[4]))**((float(sys.argv[5])-1)/float(sys.argv[4]))

r = np.linspace(0, float(sys.argv[6]), 50)

print(list(r), '%', list(func(r)))

sys.stdout.flush()